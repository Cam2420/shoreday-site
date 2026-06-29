/**
 * Pure, dependency-free time and date helpers for the Nassau funnel.
 *
 * Scope assumption (per Funnel V1 Spec §6): all clock times are wall-clock
 * `America/Nassau` values for a single port day. Calculations are same-day
 * local-minute differences. Overnight/cross-midnight sequences are rejected by
 * the port-math engine rather than wrapped, so no timezone or DST conversion is
 * performed here. Date math for `days_to_port` uses UTC midnights, which are
 * always exactly 24h apart (UTC has no DST), so day counts are stable.
 */

/** Matches a 24-hour `HH:mm` clock time (00:00–23:59). */
const TIME_RE = /^([01]\d|2[0-3]):([0-5]\d)$/;

/** Matches a `YYYY-MM-DD` calendar date shape (range/realness checked separately). */
const DATE_RE = /^(\d{4})-(\d{2})-(\d{2})$/;

/** True when `value` is a well-formed `HH:mm` 24-hour time string. */
export function isValidTimeString(value: string): boolean {
  return TIME_RE.test(value);
}

/**
 * True when `value` is a real `YYYY-MM-DD` calendar date (rejects e.g.
 * `2026-02-30` or `2026-13-01`).
 */
export function isValidDateString(value: string): boolean {
  const match = DATE_RE.exec(value);
  if (!match) return false;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (month < 1 || month > 12) return false;
  if (day < 1 || day > 31) return false;
  // Round-trip through UTC to reject impossible day-of-month values.
  const d = new Date(Date.UTC(year, month - 1, day));
  return (
    d.getUTCFullYear() === year &&
    d.getUTCMonth() === month - 1 &&
    d.getUTCDate() === day
  );
}

/**
 * Convert `HH:mm` to minutes-from-midnight (0–1439).
 * @throws if the string is not a valid 24-hour time.
 */
export function timeToMinutes(value: string): number {
  const match = TIME_RE.exec(value);
  if (!match) {
    throw new RangeError(`Invalid time string: ${JSON.stringify(value)}`);
  }
  return Number(match[1]) * 60 + Number(match[2]);
}

/**
 * Convert minutes-from-midnight back to `HH:mm`.
 * @throws if `minutes` is outside a single day (0–1439).
 */
export function minutesToTime(minutes: number): string {
  if (!Number.isInteger(minutes) || minutes < 0 || minutes > 1439) {
    throw new RangeError(`Minutes out of single-day range (0-1439): ${minutes}`);
  }
  const hh = Math.floor(minutes / 60);
  const mm = minutes % 60;
  return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
}

/**
 * Convert 24-hour `HH:mm` to a friendly 12-hour label, e.g. "3:45 PM".
 * Returns the input unchanged if it is not a valid `HH:mm` string.
 * Canonical formatter — import from here so all layers (server route, UI,
 * itinerary engine) use the same output format.
 */
export function to12Hour(hhmm: string): string {
  const m = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(hhmm);
  if (!m) return hhmm;
  const h = Number(m[1]);
  const period = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${m[2]} ${period}`;
}

/**
 * Whole calendar days from `fromDate` to `toDate` (both `YYYY-MM-DD`), measured
 * at UTC midnight. Positive when `toDate` is later. Used for `days_to_port`.
 * @throws if either date string is not a real calendar date.
 */
export function daysBetweenDates(fromDate: string, toDate: string): number {
  if (!isValidDateString(fromDate) || !isValidDateString(toDate)) {
    throw new RangeError(
      `Invalid date string(s): ${JSON.stringify(fromDate)}, ${JSON.stringify(toDate)}`,
    );
  }
  const [fy, fm, fd] = fromDate.split('-').map(Number);
  const [ty, tm, td] = toDate.split('-').map(Number);
  const from = Date.UTC(fy, fm - 1, fd);
  const to = Date.UTC(ty, tm - 1, td);
  return Math.round((to - from) / 86_400_000);
}

/**
 * Add `days` (negative to subtract) to a `YYYY-MM-DD` date and return the new
 * `YYYY-MM-DD`. UTC-based for the same DST-free stability as `daysBetweenDates`;
 * month/year roll-over is handled by `Date.UTC` normalization.
 * @throws if `date` is not a real calendar date.
 */
export function addDays(date: string, days: number): string {
  if (!isValidDateString(date)) {
    throw new RangeError(`Invalid date string: ${JSON.stringify(date)}`);
  }
  const [y, m, d] = date.split('-').map(Number);
  const shifted = new Date(Date.UTC(y, m - 1, d + days));
  const yy = shifted.getUTCFullYear();
  const mm = String(shifted.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(shifted.getUTCDate()).padStart(2, '0');
  return `${yy}-${mm}-${dd}`;
}

/**
 * Format a `YYYY-MM-DD` calendar date as a friendly label, e.g. "Jun 29, 2026".
 * Returns the input unchanged if it is not a real calendar date. Formatted in UTC
 * so the label never shifts a day due to the server's local timezone.
 */
export function toDisplayDate(date: string): string {
  if (!isValidDateString(date)) return date;
  const [y, m, d] = date.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

/** Today's date as `YYYY-MM-DD`, measured in UTC (matches the day math above). */
export function todayDateStringUtc(): string {
  const now = new Date();
  const yy = now.getUTCFullYear();
  const mm = String(now.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(now.getUTCDate()).padStart(2, '0');
  return `${yy}-${mm}-${dd}`;
}
