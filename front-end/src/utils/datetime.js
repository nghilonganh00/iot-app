const formatDate = (dateString) => {
  const date = new Date(dateString);

  // Adjust for Vietnam's timezone (UTC+7)
  const vietnamOffset = 7 * 60 * 60 * 1000; 
  const localDate = new Date(date.getTime() + vietnamOffset);

  const pad = (num) => (num < 10 ? "0" + num : num);
  const hours = pad(localDate.getUTCHours());
  const minutes = pad(localDate.getUTCMinutes());
  const seconds = pad(localDate.getUTCSeconds());
  const day = pad(localDate.getUTCDate());
  const month = pad(localDate.getUTCMonth() + 1);
  const year = localDate.getUTCFullYear();

  return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
};

export default formatDate;
