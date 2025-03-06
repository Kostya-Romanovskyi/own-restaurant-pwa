import { FC } from 'react';
import Select from 'react-select';
import { customSelectStyles } from '../../styles/selectStyles';

interface ISelectArrayProps {
  value: string;
  label: string;
}

interface ISelectProps {
  options: ISelectArrayProps[];
  selectedOption: ISelectArrayProps;
  setSelectedOption: (selected: ISelectArrayProps) => void;
}

const SelectComponent: FC<ISelectProps> = ({ options, selectedOption, setSelectedOption }) => {
  const handleChange = (selected: ISelectArrayProps | null) => {
    console.log(selected);

    if (selected) {
      setSelectedOption(selected);
    }
  };

  return (
    <div>
      <Select
        onChange={handleChange}
        value={selectedOption}
        options={options}
        styles={customSelectStyles}
        placeholder={options[0].label || 'Select an option'}
      />
    </div>
  );
};

export default SelectComponent;
