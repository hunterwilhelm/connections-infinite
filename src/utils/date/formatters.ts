import { DATE_FORMAT_OPTIONS } from './constants';
import { parseDate } from './parser';

/**
 * Formats a date string for display in the local timezone
 * @param dateString - The date string to format (YYYY-MM-DD)
 * @returns Formatted date string (e.g., "Tuesday, December 17")
 */
export function formatDate(dateString: string): string {
  const date = parseDate(dateString);
  return date.toLocaleDateString('en-US', DATE_FORMAT_OPTIONS);
}