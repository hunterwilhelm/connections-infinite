/**
 * Gets the local timezone name
 * @returns Local timezone name (e.g., "America/Los_Angeles")
 */
export function getLocalTimezone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

/**
 * Creates a date in the local timezone
 * @param utcDate - Date in UTC
 * @returns Date in local timezone
 */
export function createLocalDate(utcDate: Date): Date {
  return new Date(utcDate.toLocaleString('en-US', {
    timeZone: getLocalTimezone()
  }));
}