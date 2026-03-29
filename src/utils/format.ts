/**
 * Calculate experience duration from a given start date to now.
 * Returns { years, months, days }
 */
export function getExperience(since: Date): { years: number; months: number; days: number } {
  const now = new Date();
  let years = now.getFullYear() - since.getFullYear();
  let months = now.getMonth() - since.getMonth();
  let days = now.getDate() - since.getDate();

  if (days < 0) {
    months -= 1;
    days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return { years, months, days };
}

/**
 * Format a Date to a readable string: "Mar 2025"
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' }).format(date);
}

/**
 * Format a Date to ISO date string: "2025-03-29"
 */
export function formatDateISO(date: Date): string {
  return date.toISOString().split('T')[0]!;
}
