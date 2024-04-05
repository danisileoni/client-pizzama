import { useEffect, useState } from 'react';
import { type DataLogin } from '../types';
import { InputForm } from '../components/InputForm';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const LoginPage = (): JSX.Element => {
  const [data, setData] = useState<DataLogin>({
    user: '',
    password: '',
  });
  const [errorEmpty, setErrorEmpty] = useState<boolean>(false);
  const { login, errorMessage, state } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (state.authenticated) {
      navigate('/platform');
    }
  }, [state.authenticated]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const { name, value } = e.target;

    setErrorEmpty(false);
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (data.user === '' || data.user === undefined) {
      setErrorEmpty(true);
      return;
    }

    login(data).catch((error) => error);
  };

  return (
    <>
      <section className="flex h-[calc(100vh-50px)] justify-center items-center">
        <div className="bg-zinc-800 pb-11 pl-14 pr-14 pt-8 rounded-xl">
          <h1 className="text-4xl mb-3 font-bold text-left">Login</h1>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <InputForm
              name="User"
              nameValue="user"
              handleChange={handleChange}
              placeholder="e.g: richwatterson"
              value={data.user}
              tCss={
                errorEmpty
                  ? 'border-red-500 border-2 focus:outline-rose-500'
                  : ''
              }
              type="text"
            />
            <p className="text-xs text-rose-500">&nbsp;</p>

            <InputForm
              handleChange={handleChange}
              name="Password"
              nameValue="password"
              value={data.password}
              placeholder="Passwaord"
              tCss={
                errorEmpty
                  ? 'border-red-500 border-2 focus:outline-rose-500'
                  : ''
              }
              type="password"
            />
            <p className="text-xs text-rose-500 text-center">
              &nbsp; {errorMessage?.message}
            </p>

            <button
              className="bg-indigo-600 mt-2 rounded-md pl-10 pr-10 p-1  self-end"
              type="submit"
            >
              Login
            </button>
          </form>
          <span className="flex justify-between mt-5">
            <p>You do not have an account?</p>
            <Link className="text-blue-500" to={'/register'}>
              Register
            </Link>
          </span>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
