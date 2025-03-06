import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { FC } from 'react';

interface ICalendarProps {
  onTimeSelect: (time: string) => void;
}

const ResponsiveDateTimePickers: FC<ICalendarProps> = ({ onTimeSelect }) => {
  const currentDate = dayjs();
  const isAfter7PM = currentDate.hour() >= 19;

  const shouldDisableDate = (date: any) => {
    return isAfter7PM && date.isSame(currentDate, 'day');
  };

  const shouldDisableTime = (time: any) => {
    const hour = time.hour();
    const minute = time.minute();

    if (hour >= 10 && hour < 14) {
      if (hour === 14 && minute > 30) {
        return true;
      }
      return false;
    }

    if (hour >= 16 && hour < 20) {
      if (hour === 19 && minute > 30) {
        return true;
      }
      return false;
    }

    return true;
  };

  const handleDateChange = (newDate: any) => {
    const formattedDate = newDate ? newDate.format('YYYY-MM-DD HH:mm:ss') : '';
    onTimeSelect(formattedDate);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['MobileDateTimePicker']}>
        <DemoItem>
          <MobileDateTimePicker
            defaultValue={currentDate}
            onAccept={handleDateChange}
            shouldDisableDate={shouldDisableDate}
            shouldDisableTime={shouldDisableTime}
            minDate={currentDate}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default ResponsiveDateTimePickers;
