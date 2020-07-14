export function parseDate(dateStr) {
  const [date, month, year] = dateStr.trim().split('.');
  return { date: +date, month: month - 1, year: +year };
}
export function getNumberOfWeek(date) {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}