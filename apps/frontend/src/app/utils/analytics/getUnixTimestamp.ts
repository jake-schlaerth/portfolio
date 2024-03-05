export const getUnixTimestamp = (date = new Date()) =>
  Math.floor(date.getTime() / 1000);
