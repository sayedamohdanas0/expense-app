function getFormattedDate(date) {
  const isDate = date instanceof Date;
  if (!isDate) {
    return "Not Date";
  }

  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}
export function getDateMinusDays(date,days){
  return new Date(date.getFullYear(), date.getMonth(),date.getDate()-days);
}
export default getFormattedDate;
