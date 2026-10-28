/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { executeTerminalCommand } from './terminalLogic';
import { initialPortfolioData } from '../data/portfolioData';

test('executeTerminalCommand returns command list on help', () => {
  const result = executeTerminalCommand('help', initialPortfolioData);
  assert.ok(result.output.length > 5);
  const helpText = result.output.map((o) => o.text).join(' ');
  assert.ok(helpText.includes('whoami'));
  assert.ok(helpText.includes('projects'));
  assert.ok(helpText.includes('skills'));
});

test('executeTerminalCommand whoami outputs configured name and handle', () => {
  const result = executeTerminalCommand('whoami', initialPortfolioData);
  const text = result.output.map((o) => o.text).join(' ');
  assert.ok(text.includes(initialPortfolioData.personal.name));
  assert.ok(text.includes(initialPortfolioData.personal.handle));
});

test('executeTerminalCommand clear returns clear action', () => {
  const result = executeTerminalCommand('clear', initialPortfolioData);
  assert.equal(result.action, 'clear');
  assert.equal(result.output.length, 0);
});

test('executeTerminalCommand matrix toggles matrix background', () => {
  const result = executeTerminalCommand('matrix', initialPortfolioData);
  assert.equal(result.action, 'toggle-matrix');
});

test('executeTerminalCommand goto navigates to legitimate pages', () => {
  const result = executeTerminalCommand('goto projects', initialPortfolioData);
  assert.equal(result.action, 'navigate');
  assert.equal(result.targetPath, '/projects');
});

test('executeTerminalCommand unknown command returns helpful error', () => {
  const result = executeTerminalCommand('unknowncmd99', initialPortfolioData);
  assert.equal(result.output[0].type, 'error');
  assert.ok(result.output[0].text.includes('command not found'));
});
