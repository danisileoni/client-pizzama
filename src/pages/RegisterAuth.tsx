import { useState } from 'react';
import { Link } from 'react-router-dom';

export const RegisterAuth = (): JSX.Element => {
  const [data, setData] = useState({
    fullName: '',
    user: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const { name, value } = e.target;
    setErrors({ ...errors, [name]: validInput(name, value) });
    console.log(validInput(name, value));

    setData({
      ...data,
      [name]: value,
    });
  };

  const validInput = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'user':
        if (value.length <= 6) {
          return 'minimum 6 characters';
        }
        break;
      case 'email':
        if (!/\S+@\S+\.\S+/.test(value)) {
          return 'Invalid email';
        }
        break;
      case 'password':
        if (value.length <= 8) {
          return 'minimum 8 characters';
        }
        if (!/(?=.*\W+)/.test(value)) {
          return 'at least one special character';
        }
        if (!/(?![.\n])/.test(value)) {
          return 'does not contain a period or a line break';
        }
        if (!/(?=.*[A-Z])/.test(value)) {
          return 'must contain at least one capital letter';
        }
        if (!/(?=.*[a-z])/.test(value)) {
          return 'must contain at least one lowercase';
        }
        break;

      default:
        break;
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log(data);
  };

  return (
    <>
      <section className="flex h-[calc(100vh-50px)] justify-center items-center">
        <div className="bg-zinc-800 pb-11 pl-14 pr-14 pt-8 rounded-xl">
          <h1 className="text-4xl mb-3 font-bold text-left">Register</h1>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <p>Full Name</p>
            <input
              className="mb-3 p-2 rounded-md w-80 text-black"
              type="text"
              name="fullName"
              value={data.fullName}
              onChange={handleChange}
              placeholder="e.g: Richard Watterson"
            />
            <p>User</p>
            <input
              className="mb-3 p-2 rounded-md w-80 text-black"
              type="text"
              name="user"
              value={data.user}
              onChange={handleChange}
              placeholder="e.g: richwatterson"
            />
            <p>Email</p>
            <input
              className="mb-3 p-2 rounded-md w-80 text-black"
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Email"
            />
            <p>Password</p>
            <input
              className="mb-3 p-2 rounded-md w-80 text-black"
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              placeholder="Password"
            />
            <p>Confirm Password</p>
            <input
              className="mb-3 p-2 rounded-md w-80 text-black"
              type="password"
              placeholder="Confirm password"
            />
            <button
              className="bg-indigo-600 rounded-md pl-10 pr-10 p-1  self-end"
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
