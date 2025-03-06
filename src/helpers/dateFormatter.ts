import dayjs, { Dayjs } from 'dayjs';

const DateFormatter = (date: Dayjs | string | Date = dayjs()) => {
  return dayjs(date).format('MM.DD.YYYY');
};

export default DateFormatter;
