import { format } from 'date-fns-tz';

const dateAndTime = (date: string | Date = '2025-01-08T08:38:08.000Z') => {
  return format(new Date(date), 'MM.dd.yyyy hh:mm', { timeZone: 'UTC' });
};

export default dateAndTime;
