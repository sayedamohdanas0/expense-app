function getFormattedDate(date) {
  if (!date instanceof Date) {
    return "Not Date";
  }
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}
export default getFormattedDate;
