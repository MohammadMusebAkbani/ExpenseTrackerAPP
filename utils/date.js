export function getFormattedDate(date) {
  return `${date.getDate()}-${date.getMonth() + 1}-${String(date.getFullYear())}`;
}

export function getDateMinusDays(date, days) {
  return new Date(date.getDate() - days, date.getMonth(), date.getFullYear());
}
