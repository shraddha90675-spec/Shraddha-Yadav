/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Partial<Record<keyof ContactFormValues, string>>;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function sanitizeInput(value: string): string {
  return value.trim();
}

export function validateContactForm(values: ContactFormValues): ValidationResult {
  const errors: Partial<Record<keyof ContactFormValues, string>> = {};

  const cleanName = sanitizeInput(values.name);
  if (!cleanName) {
    errors.name = 'Agent / Sender identity is required.';
  } else if (cleanName.length < 2) {
    errors.name = 'Name must be at least 2 characters long.';
  } else if (cleanName.length > 60) {
    errors.name = 'Name cannot exceed 60 characters.';
  }

  const cleanEmail = sanitizeInput(values.email);
  if (!cleanEmail) {
    errors.email = 'Valid return transmission email address is required.';
  } else if (!EMAIL_REGEX.test(cleanEmail)) {
    errors.email = 'Invalid email address syntax (e.g., user@domain.com).';
  }

  const cleanSubject = sanitizeInput(values.subject);
  if (!cleanSubject) {
    errors.subject = 'Transmission subject line is required.';
  } else if (cleanSubject.length < 3) {
    errors.subject = 'Subject must be at least 3 characters long.';
  } else if (cleanSubject.length > 100) {
    errors.subject = 'Subject cannot exceed 100 characters.';
  }

  const cleanMessage = sanitizeInput(values.message);
  if (!cleanMessage) {
    errors.message = 'Payload message body cannot be empty.';
  } else if (cleanMessage.length < 10) {
    errors.message = 'Message payload must contain at least 10 characters.';
  } else if (cleanMessage.length > 2000) {
    errors.message = 'Message payload exceeds maximum buffer length (2000 chars).';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Computes a pseudo SHA-256 fingerprint simulation for cyber feedback
 */
export function generateChecksum(input: string): string {
  let hash = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  const hex = (hash >>> 0).toString(16).padStart(8, '0');
  return `0x${hex.toUpperCase()}${hex.split('').reverse().join('').toUpperCase()}`;
}
