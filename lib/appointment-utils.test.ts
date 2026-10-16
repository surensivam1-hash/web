import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validatePhoneNumber,
  validateAppointmentDate,
  generateBookingReference,
} from './appointment-utils.ts';

test('validatePhoneNumber accepts valid Sri Lankan mobile numbers (07X XXX XXXX)', () => {
  const result1 = validatePhoneNumber('0771234567');
  assert.equal(result1.isValid, true);
  assert.equal(result1.normalized, '0771234567');

  const result2 = validatePhoneNumber('071 234 5678');
  assert.equal(result2.isValid, true);

  const result3 = validatePhoneNumber('076-987-6543');
  assert.equal(result3.isValid, true);
});

test('validatePhoneNumber accepts Sri Lankan numbers with country code (+94)', () => {
  const result = validatePhoneNumber('+94 77 123 4567');
  assert.equal(result.isValid, true);
  assert.equal(result.normalized, '+94771234567');
});

test('validatePhoneNumber rejects empty or invalid inputs', () => {
  const empty = validatePhoneNumber('');
  assert.equal(empty.isValid, false);

  const letters = validatePhoneNumber('abc12345');
  assert.equal(letters.isValid, false);

  const tooShort = validatePhoneNumber('12345');
  assert.equal(tooShort.isValid, false);
});

test('validateAppointmentDate blocks past dates and allows today and future dates', () => {
  const today = '2026-10-16';
  const past = '2026-10-15';
  const future = '2026-10-25';

  assert.equal(validateAppointmentDate(past, today).isValid, false);
  assert.equal(validateAppointmentDate(today, today).isValid, true);
  assert.equal(validateAppointmentDate(future, today).isValid, true);
});

test('generateBookingReference produces format NLM-YYYY-XXXX', () => {
  const ref = generateBookingReference('NLM');
  assert.match(ref, /^NLM-\d{4}-\d{4}$/);
});
