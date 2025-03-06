import { useForm, SubmitHandler } from 'react-hook-form';
import './personal-data.scss';
import { useQuery } from '@tanstack/react-query';
import { IRegister } from '../../API/auth/auth.interface';
import { useState } from 'react';
import { useUpdateUserData } from '../../hooks/useAuth';
import PersonalChangeBtns from '../PersonalChangeBtns/PersonalChangeBtns';

import InputString from '../InputString/InputString';
import Spinner from '../Spinner/Spinner';
import spinnerSize from '../../constants/spinnerSize';

type Inputs = {
  name: string;
  last_name: string;
  email: string;
  phone: string;
  additional_information: string;
};
type InputsState = {
  name: boolean;
  last_name: boolean;
  email: boolean;
  phone: boolean;
  additional_information: boolean;
};

const PersonalData = () => {
  const { data: userData } = useQuery<IRegister>({ queryKey: ['current'] });

  const { mutate, isPending } = useUpdateUserData();

  const [inputStates, setInputStates] = useState<InputsState>({
    name: true,
    last_name: true,
    email: true,
    phone: true,
    additional_information: true,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const handleToggle = (field: keyof typeof inputStates) => {
    setInputStates(prev => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const onSubmit: SubmitHandler<Inputs> = data => {
    const updatedFields = Object.keys(data).reduce((acc, key) => {
      const typedKey = key as keyof Inputs;

      if (!inputStates[typedKey as keyof InputsState]) {
        acc[typedKey] = data[typedKey];
      }

      return acc;
    }, {} as Partial<Inputs>);

    if (Object.keys(updatedFields).length === 0) {
      console.log('You has now new data to update');
      return;
    }

    mutate({
      userId: userData?.id || -1,
      newUserData: updatedFields,
    });

    inputStates.additional_information = true;
    inputStates.email = true;
    inputStates.last_name = true;
    inputStates.name = true;
    inputStates.phone = true;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="personal__data__wrapp">
        <div className="personal__input__wrapp">
          <InputString
            placeholder={userData?.name || ''}
            label="Name"
            name="name"
            register={register}
            type="text"
            defaultValue={userData?.name || ''}
            disabled={inputStates.name}
          />
          <PersonalChangeBtns handleToggle={handleToggle} label="name" inputStates={inputStates} />
        </div>

        <div className="personal__input__wrapp">
          <InputString
            placeholder={userData?.last_name || ''}
            label="Last name"
            name="last_name"
            register={register}
            type="text"
            defaultValue={userData?.last_name || ''}
            disabled={inputStates.last_name}
          />
          <PersonalChangeBtns
            handleToggle={handleToggle}
            label="last_name"
            inputStates={inputStates}
          />
          {errors.last_name && <span>This field is required</span>}
        </div>
      </div>

      <div className="personal__data__wrapp">
        <div className="personal__input__wrapp">
          <InputString
            placeholder={userData?.email || ''}
            label="Email"
            name="email"
            register={register}
            type="email"
            defaultValue={userData?.email || ''}
            disabled={inputStates.email}
          />
          <PersonalChangeBtns handleToggle={handleToggle} label="email" inputStates={inputStates} />
        </div>

        <div className="personal__input__wrapp">
          <InputString
            placeholder={userData?.phone || ''}
            label="Phone number"
            name="phone"
            register={register}
            type="tel"
            defaultValue={userData?.phone || ''}
            disabled={inputStates.phone}
          />
          <PersonalChangeBtns handleToggle={handleToggle} label="phone" inputStates={inputStates} />
        </div>
      </div>

      <div className="personal__additional__wrapper">
        <div className="personal__additional__wrapper__width">
          <label className="personal__additional__label" htmlFor="additional_information">
            Additional information about you (about allergies, preferences etc...)
          </label>
          <textarea
            className={`personal__additional__info  ${inputStates.additional_information ? 'input__bg__color__enabled' : 'input__bg__color__disabled'}`}
            {...register('additional_information')}
            name="additional_information"
            id="additional_information"
            defaultValue={userData?.additional_information}
            readOnly={inputStates.additional_information}
          ></textarea>
        </div>

        <PersonalChangeBtns
          handleToggle={handleToggle}
          label="additional_information"
          inputStates={inputStates}
        />
      </div>

      <button className="personal__apply__btn button__type--indent" type="submit">
        {isPending ? <Spinner size={spinnerSize.sm} /> : 'Apply changes'}
      </button>
    </form>
  );
};

export default PersonalData;
