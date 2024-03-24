import { Link, useNavigate } from 'react-router-dom';
import { InputForm } from '../components/InputForm.tsx';
import { useFormRegister } from '../hooks/useFormRegister.ts';
import { useAuth } from '../hooks/useAuth.ts';
import { useEffect } from 'react';

export const RegisterPage = (): JSX.Element => {
  const { data, errors, handleChange, validObjectData } = useFormRegister();
  const { register, errorMessage, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/platform');
    }
  }, [isAuthenticated]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    validObjectData();

    if (Object.values(errors).every((error) => error === undefined)) {
      register(data).catch((error) => error);
    }
  };

  return (
    <>
      <section className="flex h-[calc(100vh-50px)] justify-center items-center">
        <div className="bg-zinc-800 pb-11 pl-14 pr-14 pt-8 rounded-xl">
          <h1 className="text-4xl mb-3 font-bold text-left">Register</h1>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <InputForm
              name="Full Name"
              handleChange={handleChange}
              value={data.fullName}
              placeholder="e.g: Richard Watterson"
              nameValue="fullName"
              tCss={
                errors.fullName !== '' && errors.fullName !== undefined
                  ? 'border-red-500 border-2 focus:outline-rose-500'
                  : ''
              }
            />
            <p className="text-xs text-rose-500">
              &nbsp;
              {errors.fullName !== undefined && errors.fullName}
            </p>

            <InputForm
              name="User"
              nameValue="user"
              handleChange={handleChange}
              placeholder="e.g: richwatterson"
              tCss={
                errors.user !== '' && errors.user !== undefined
                  ? 'border-red-500 border-2 focus:outline-rose-500'
                  : ''
              }
              type="text"
              value={data.user}
            />
            <p className="text-xs text-rose-500">
              &nbsp;
              {errors.user !== undefined && errors.user}
              {errorMessage?.message === 'existing user' &&
                errorMessage?.message}
            </p>

            <InputForm
              tCss={
                errors.email !== '' && errors.email !== undefined
                  ? 'border-red-500 border-2 focus:outline-rose-500'
                  : ''
              }
              handleChange={handleChange}
              name="Email"
              nameValue="email"
              value={data.email}
              placeholder="Email"
              type="email"
            />
            <p className="text-xs text-rose-500">
              &nbsp;
              {errors.email !== undefined && errors.email}
              {errorMessage?.message === 'existing email' &&
                errorMessage?.message}
            </p>

            <InputForm
              handleChange={handleChange}
              name="Password"
              nameValue="password"
              value={data.password}
              placeholder="Passwaord"
              tCss={
                errors.password !== '' && errors.password !== undefined
                  ? 'border-red-500 border-2 focus:outline-rose-500'
                  : ''
              }
              type="password"
            />
            <p className="text-xs text-rose-500">
              &nbsp;
              {errors.password !== undefined && errors.password}
            </p>

            <InputForm
              handleChange={handleChange}
              name="Confirm Password"
              nameValue="password2"
              placeholder="Confirm password"
              type="password"
              tCss={
                errors.passwordConfirm !== '' &&
                errors.passwordConfirm !== undefined
                  ? 'border-red-500 border-2 focus:outline-rose-500'
                  : ''
              }
            />
            <p className="text-xs text-rose-500">
              &nbsp;
              {errors.passwordConfirm !== undefined && errors.passwordConfirm}
            </p>
            <button
              className="bg-indigo-600 mt-2 rounded-md pl-10 pr-10 p-1  self-end"
              type="submit"
            >
              Register
            </button>
          </form>
          <span className="flex justify-between mt-5">
            <p>Do you already have an account?</p>
            <Link className="text-blue-500" to={'/login'}>
              Login
            </Link>
          </span>
        </div>
      </section>
    </>
  );
};
