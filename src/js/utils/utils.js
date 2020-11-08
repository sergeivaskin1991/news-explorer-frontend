import { monthSplit, msDay } from '../constants/constants';

export function getDate() {
  const todayDate = new Date();
  const dateInMs = 6 * msDay;
  const lastDate = new Date(todayDate.getTime() - dateInMs);
  const dateFrom = lastDate.toISOString().slice(0, 10);
  const dateTo = todayDate.toISOString().slice(0, 10);

  return { dateFrom, dateTo };
}

export function setDate(data) {
  const date = new Date(data);
  const month = monthSplit[date.getMonth()];

  return `${date.getDate()} ${month}, ${date.getFullYear()}`;
}
