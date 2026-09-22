/**
 * Index into the Monday-first `days` array for a given date (Mon = 0, Sun = 6).
 *
 * @param date - Date to classify (local time)
 * @returns    0–6, Monday-first
 */
export function dayIndex(date: Date): number {
  return (date.getDay() + 6) % 7;
}

/**
 * Stable key for the Monday-to-Sunday week containing `date`, as the ISO date
 * of that week's Monday in local time (e.g. "2026-09-21"). Two dates share a
 * key iff they fall in the same training week, which is what progress is
 * scoped to.
 *
 * @param date - Any date inside the week
 * @returns    "YYYY-MM-DD" of the week's Monday
 */
export function weekKey(date: Date): string {
  const monday = new Date(date.getFullYear(), date.getMonth(), date.getDate() - dayIndex(date));
  const y = monday.getFullYear();
  const m = String(monday.getMonth() + 1).padStart(2, "0");
  const d = String(monday.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
