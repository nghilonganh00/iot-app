function convertDateFormat(dateStr) {
  if (!dateStr || dateStr === null) {
    return null;
  }
  const [time, date] = dateStr.split(" ");

  const [day, month, year] = date.split("/");

  const dateObj = new Date(`${year}-${month}-${day}T${time}.000Z`);

  dateObj.setUTCHours(dateObj.getUTCHours() - 7);

  const adjustedYear = dateObj.getUTCFullYear();
  const adjustedMonth = String(dateObj.getUTCMonth() + 1).padStart(2, "0");
  const adjustedDay = String(dateObj.getUTCDate()).padStart(2, "0");
  const adjustedHours = String(dateObj.getUTCHours()).padStart(2, "0");
  const adjustedMinutes = String(dateObj.getUTCMinutes()).padStart(2, "0");
  const adjustedSeconds = String(dateObj.getUTCSeconds()).padStart(2, "0");

  return `${adjustedYear}-${adjustedMonth}-${adjustedDay} ${adjustedHours}:${adjustedMinutes}:${adjustedSeconds}`;
}

export default convertDateFormat;
