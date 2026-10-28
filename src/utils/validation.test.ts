/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { validateContactForm, generateChecksum } from './validation';
import { filterProjects, calculateSkillStats } from './filters';
import { initialPortfolioData } from '../data/portfolioData';

test('validateContactForm rejects empty inputs', () => {
  const result = validateContactForm({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  assert.equal(result.isValid, false);
  assert.ok(result.errors.name);
  assert.ok(result.errors.email);
  assert.ok(result.errors.subject);
  assert.ok(result.errors.message);
});

test('validateContactForm rejects invalid email syntax', () => {
  const result = validateContactForm({
    name: 'Cyber Sentinel',
    email: 'not-an-email',
    subject: 'Security Audit Collaboration',
    message: 'Hello, I would like to discuss a security role opportunity.'
  });
  assert.equal(result.isValid, false);
  assert.ok(result.errors.email);
});

test('validateContactForm accepts valid inputs', () => {
  const result = validateContactForm({
    name: 'Jordan Smith',
    email: 'jordan.smith@cybercorp.io',
    subject: 'Junior Security Engineer Role Discussion',
    message: 'We were impressed by your Eco-Snap and Network Sentinel projects.'
  });
  assert.equal(result.isValid, true);
  assert.equal(Object.keys(result.errors).length, 0);
});

test('generateChecksum produces deterministic hash', () => {
  const checksum1 = generateChecksum('test-payload-1');
  const checksum2 = generateChecksum('test-payload-1');
  assert.equal(checksum1, checksum2);
  assert.ok(checksum1.startsWith('0x'));
});

test('filterProjects correctly filters by category and search query', () => {
  const allProjects = initialPortfolioData.projects;
  const webOnly = filterProjects(allProjects, 'Web Dev', '');
  assert.ok(webOnly.length > 0);
  assert.ok(webOnly.every((p) => p.category === 'Web Dev'));

  const searchResults = filterProjects(allProjects, 'All', 'Eco-Snap');
  assert.equal(searchResults.length, 1);
  assert.equal(searchResults[0].id, 'eco-snap');
});

test('calculateSkillStats computes valid averages', () => {
  const stats = calculateSkillStats(initialPortfolioData.skills);
  assert.ok(stats.average > 60 && stats.average < 100);
  assert.ok(stats.count > 5);
  assert.ok(stats.advancedCount >= 1);
});
