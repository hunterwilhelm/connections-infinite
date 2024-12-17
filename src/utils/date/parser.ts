/**
 * Parses a date string into a Date object, ensuring correct local date
 * @param dateString - Date string in YYYY-MM-DD format
 * @returns Parsed Date object in local timezone
 */
export function parseDate(dateString: string): Date {
  // Parse the date components
  const [year, month, day] = dateString.split('-').map(Number);
  
  // Create date using UTC to avoid timezone offset issues
  const date = new Date(Date.UTC(year, month - 1, day));
  
  // Convert UTC date to local date
  return new Date(date.toLocaleString('en-US', { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone }));
}