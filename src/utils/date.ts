/**
 * Formats a date string (YYYY-MM-DD) to a human-readable format using UTC
 * @param dateString Format: YYYY-MM-DD (e.g., "2024-12-17")
 * @returns Formatted date (e.g., "Tuesday, December 17")
 */
export function formatDate(dateString: string): string {
  // Split the date string into components
  const [year, month, day] = dateString.split('-').map(Number);
  
  // Create date in UTC
  const date = new Date(Date.UTC(year, month - 1, day));
  
  // Format the date in UTC
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC'
  });
}