import { useRef, useState } from 'react';
import { type DataRegister, type Errors } from '../types';

interface FormHook {
  data: DataRegister;
  errors: Errors;
  validInput: (name: string, value: string) => string | undefined;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validObjectData: () => void;
}

export const useFormRegister = (): FormHook => {
  const [data, setData] = useState<DataRegister>({
    fullName: '',
    user: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Errors>({
    fullName: '',
    user: '',
    email: '',
    password: '',
    password2: '',
    passwordConfirm: '',
  });
  const passwordConfirm = useRef('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const { name, value } = e.target;

    setErrors({ ...errors, [name]: validInput(name, value) });

    if (name !== 'password2') {
      setData({
        ...data,
        [name]: value,
      });
    }
  };

  const validObjectData = (): void => {
    for (const key in data as object) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [key]: validInput(key, data[key as keyof DataRegister]),
      }));
    }

    errors.passwordConfirm = undefined;

    if (passwordConfirm.current !== data.password) {
      setErrors({
        ...errors,
        passwordConfirm: validInput('passwordConfirm', passwordConfirm.current),
      });
      throw new Error('Passwords are not the same');
    }
  };

  const validInput = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'fullName':
        if (value.length < 3) {
          return 'minimum 3 characters';
        }
        break;
      case 'user':
        if (value.length <= 6) {
          return 'minimum 6 characters';
        } else if (!/(^[a-z]+$)/.test(value)) {
          return 'All digits be lowercase';
        }
        break;
      case 'email':
        if (!/^\S+@\S+\.com$/.test(value)) {
          return 'Invalid email';
        }
        break;
      case 'password':
        if (value.length < 8) {
          return 'Minimum 8 characters';
        } else if (!/(?=.*\W+)/.test(value)) {
          return 'At least one special character';
        } else if (!/(?![.\n])/.test(value)) {
          return 'Does not contain a period or a line break';
        } else if (!/(?=.*[A-Z])/.test(value)) {
          return 'Must contain at least one capital letter';
        } else if (!/(?=.*[a-z])/.test(value)) {
          return 'Must contain at least one lowercase';
        }
        break;
      case 'password2':
        passwordConfirm.current = value;
        if (value !== data.password) {
          return 'passwords are not the same';
        }
        break;
      case 'passwordConfirm':
        return 'Passwords are not the same';

      default:
        break;
    }
  };

  return { errors, data, handleChange, validObjectData, validInput };
};
