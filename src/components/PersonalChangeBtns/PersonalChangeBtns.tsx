import { FC } from 'react';
import { FaPen } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import './PersonalChangeBtns.scss';

type InputsState = {
  name: boolean;
  last_name: boolean;
  email: boolean;
  phone: boolean;
  additional_information: boolean;
};

interface IPropsPersonalChangeBtns {
  handleToggle: (field: keyof InputsState) => void;
  label: keyof InputsState;
  inputStates: InputsState;
}

const PersonalChangeBtns: FC<IPropsPersonalChangeBtns> = ({ handleToggle, label, inputStates }) => {
  return (
    <div>
      <button
        onClick={() => handleToggle(label)}
        className={`${inputStates[label] ? 'show__toggle__btn' : 'hide__toggle__btn'} icons__size`}
        type="button"
      >
        <FaPen />
      </button>
      <button
        onClick={() => handleToggle(label)}
        className={`${inputStates[label] ? 'hide__toggle__btn' : 'show__toggle__btn'} icons__size cross__icon__color`}
        type="button"
      >
        <IoClose />
      </button>
    </div>
  );
};

export default PersonalChangeBtns;
