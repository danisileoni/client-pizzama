import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useEffect, useRef, useState } from 'react';
import { type Errors, type UserUpdate } from '../types';
import { useFormRegister } from '../hooks/useFormRegister';

export const ConfigUser = (): JSX.Element => {
  const { userId } = useParams();
  const { updateUser, getOneUser, getActive, state, errorMessage } = useAuth();
  const { validInput } = useFormRegister();
  const [errors, setErrors] = useState<Errors>({
    user: undefined,
    email: undefined,
    password: undefined,
    passwordConfirm: undefined,
  });
  const [data, setData] = useState<UserUpdate>({
    user: undefined,
    email: undefined,
    currentPassword: '',
    password: '',
  });
  const [disabled, setDisabled] = useState<boolean>(true);
  const passwordConfirmRef = useRef('');
  const navigate = useNavigate();

  useEffect(() => {
    void (async () => {
      if (userId) {
        await getOneUser(userId);
        await getActive();
      }
    })();
  }, [userId]);

  useEffect(() => {
    if (state.activeData) {
      if (state.activeData.id !== userId) {
        navigate('/platform');
      }
    }
  }, [state.activeData]);

  useEffect(() => {
    const timeId = setTimeout(() => {
      setErrors({
        user: undefined,
        email: undefined,
        password: undefined,
        passwordConfirm: undefined,
      });
    }, 3000);

    return () => {
      clearTimeout(timeId);
    };
  }, [errors]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const { name, value } = e.target;
    setDisabled(false);

    if (name === 'passwordConfirm') {
      passwordConfirmRef.current = value;
    }

    if (name === 'email' || name === 'user') {
      if (state.findOne?.user === value || state.findOne?.email === value) {
        setDisabled(true);
      }
    }

    if (name !== 'currentPassword') {
      setErrors({ ...errors, [name]: validInput(name, value) });
    }

    if (name !== 'passwordConfirm') {
      setData({
        ...data,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>): void => {
    e.preventDefault();
    passwordConfirmRef.current = '';

    if (passwordConfirmRef.current !== data.password) {
      setErrors({
        ...errors,
        passwordConfirm: validInput(
          'passwordConfirm',
          passwordConfirmRef.current,
        ),
      });
      throw new Error('Passwords are not the same');
    }

    if (userId) {
      setDisabled(true);
      void updateUser(userId, data);
    }
  };

  return (
    <>
      <div className="grid grid-rows-6 sm:grid-rows-4 grid-cols-1 md:grid-cols-6 md:grid-rows-none h-screen ">
        <div className="flex bg-indigo-700 col-span-3 md:col-span-1 justify-center items-center">
          <Link
            className="text-7xl flex font-semibold md:absolute md:-rotate-90"
            to="/platform"
          >
            Pizzama
          </Link>
        </div>
        <div className="md:m-24 m-10 col-span-3">
          <h1 className="text-4xl font-semibold">Config User</h1>
          <form onSubmit={handleSubmit} className="flex flex-col p-3 pl-3">
            <span>Username(Optional)</span>
            <input
              className="rounded-md md:w-4/12 bg-zinc-700 p-1 pl-2"
              name="user"
              onChange={handleChange}
              type="text"
              defaultValue={state.findOne?.user}
            />
            <p className="text-xs text-rose-500">
              &nbsp;
              {errorMessage?.message === 'existing user' &&
                errorMessage?.message}
              {errors.user}
            </p>
            <span>Email(Optional)</span>
            <input
              className="rounded-md md:w-8/12 bg-zinc-700 p-1 pl-2"
              name="email"
              onChange={handleChange}
              type="text"
              defaultValue={state.findOne?.email}
            />
            <p className="text-xs text-rose-500">
              &nbsp;
              {errorMessage?.message === 'existing email' &&
                errorMessage?.message}
              {errors.email}
            </p>
            <div className="flex flex-col">
              <h4 className="text-xl">Change Password(Optional)</h4>
              <span>Current password</span>
              <input
                className="rounded-md md:w-8/12 bg-zinc-700 p-1 pl-2"
                name="currentPassword"
                value={data.currentPassword}
                onChange={handleChange}
                type="text"
                placeholder="Password"
              />
              <p className="text-xs text-rose-500">
                &nbsp;
                {state.error?.message === 'Invalid password' &&
                  state.error?.message}
              </p>
              <span>New password</span>
              <input
                className="rounded-md md:w-8/12 bg-zinc-700 p-1 pl-2"
                name="password"
                value={data.password}
                onChange={handleChange}
                type="text"
                placeholder="New Password"
              />
              <p className="text-xs text-rose-500">
                &nbsp;
                {errors.password}
              </p>
              <span>Confirm password</span>
              <input
                className="rounded-md md:w-8/12 bg-zinc-700 p-1 pl-2"
                type="text"
                onChange={handleChange}
                name="passwordConfirm"
                placeholder="confirm Password"
              />
              <p className="text-xs text-rose-500">
                &nbsp;
                {errors.passwordConfirm}
              </p>
            </div>
            <div className="flex mt-2">
              <button
                type="submit"
                disabled={disabled}
                className="md:w-8/12 w-full hover:bg-blue-700 hover:transition-colors pt-[2px] pb-[2px] rounded-lg bg-blue-500"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
