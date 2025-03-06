import { FC } from 'react';
import { ChangeEvent } from 'react';
import './input-string.scss';

interface IInputString {
  label: string;
  name: string;
  defaultValue: string;
  type: string;
  register: any;
  placeholder: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
}

const InputString: FC<IInputString> = ({
  label,
  name,
  defaultValue,
  type = 'string',
  register,
  placeholder = '',
  onChange = () => {},
  error,
  disabled,
}) => {
  return (
    <div className="container__width">
      <label className="main__label" htmlFor={name}>
        {label}
      </label>
      <input
        className={`main__input ${disabled ? 'input__bg__color__enabled' : 'input__bg__color__disabled'}`}
        {...register(name)}
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={onChange}
        defaultValue={defaultValue}
        readOnly={disabled}
      />
      {error && <p>{error}</p>}
    </div>
  );
};

export default InputString;
