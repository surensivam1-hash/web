/**
 * Utilities for clinic appointment validation, date checks, and reference generation.
 */

export interface PhoneValidationResult {
  isValid: boolean;
  normalized?: string;
  errorMessage?: string;
}

/**
 * Validates Sri Lankan and standard international phone numbers.
 * Valid examples:
 * - 0771234567, 071 234 5678, 076-1234567 (10 digits starting with 07)
 * - 021 222 4500 (landlines starting with 0)
 * - +94771234567, +94 77 123 4567, +94 21 222 4500 (+94 followed by 9 digits)
 * - General mobile: 9 to 12 digits
 */
export function validatePhoneNumber(phone: string): PhoneValidationResult {
  const trimmed = phone.trim();
  if (!trimmed) {
    return { isValid: false, errorMessage: 'Phone number is required.' };
  }

  // Remove spaces, hyphens, and parentheses
  const cleaned = trimmed.replace(/[\s\-\(\)]/g, '');

  // Sri Lankan formats
  // 1. Starts with +94 followed by 9 digits (e.g., +94771234567)
  const slIntlPattern = /^\+94\d{9}$/;
  // 2. Starts with 0 followed by 9 digits (e.g., 0771234567)
  const slLocalPattern = /^0\d{9}$/;
  // 3. Just 9 digits starting with 7 (e.g. 771234567)
  const slNinePattern = /^[1-9]\d{8}$/;
  // 4. General valid international (E.164-ish): 8 to 15 digits
  const generalPattern = /^\+?[0-9]{9,15}$/;

  if (slIntlPattern.test(cleaned)) {
    return { isValid: true, normalized: cleaned };
  }
  if (slLocalPattern.test(cleaned)) {
    return { isValid: true, normalized: cleaned };
  }
  if (slNinePattern.test(cleaned)) {
    return { isValid: true, normalized: `0${cleaned}` };
  }
  if (generalPattern.test(cleaned)) {
    return { isValid: true, normalized: cleaned };
  }

  return {
    isValid: false,
    errorMessage: 'Please enter a valid phone number (e.g. 077 123 4567 or +94 77 123 4567).',
  };
}

/**
 * Validates that an appointment date is not in the past.
 * Dates are given in YYYY-MM-DD format.
 */
export function validateAppointmentDate(dateStr: string, referenceDateStr?: string): { isValid: boolean; errorMessage?: string } {
  if (!dateStr || !dateStr.trim()) {
    return { isValid: false, errorMessage: 'Please select an appointment date.' };
  }

  const todayStr = referenceDateStr || getTodayDateString();

  if (dateStr < todayStr) {
    return { isValid: false, errorMessage: 'Appointment date cannot be in the past.' };
  }

  return { isValid: true };
}

/**
 * Returns today's date formatted as YYYY-MM-DD
 */
export function getTodayDateString(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Generates an authentic appointment reference ID for the clinic demonstration.
 * Format: NLM-YYYY-XXXX (e.g. NLM-2026-8492)
 */
export function generateBookingReference(prefix: string = 'NLM'): string {
  const year = new Date().getFullYear();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${year}-${randomSuffix}`;
}

/**
 * Generates an .ics calendar file content for the booked demo appointment
 */
export function generateIcsCalendarContent(details: {
  title: string;
  description: string;
  location: string;
  dateStr: string;
  timeSlotStr: string;
}): string {
  const { title, description, location, dateStr } = details;
  const cleanDate = dateStr.replace(/-/g, '');
  const startDt = `${cleanDate}T090000Z`;
  const endDt = `${cleanDate}T100000Z`;

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Nalam Clinic Jaffna//Appointment Demo//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `SUMMARY:${title}`,
    `DESCRIPTION:${description.replace(/\n/g, '\\n')}`,
    `LOCATION:${location}`,
    `DTSTART:${startDt}`,
    `DTEND:${endDt}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}
