import { FC } from 'react';
import { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface DatePickerProps {
  value: Dayjs | null;
  onChange: (date: Dayjs | null) => void;
}

const DatePickerValue: FC<DatePickerProps> = ({ value, onChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker
          label="Controlled picker"
          value={value}
          onChange={newValue => onChange(newValue)}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default DatePickerValue;
