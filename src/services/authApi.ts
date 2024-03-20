import { type AuthAPIRegister, type Data } from '../types';

const API = 'http://localhost:3000/api/';

export const authRegister = async (
  userData: Data,
): Promise<AuthAPIRegister> => {
  const respones = await fetch(`${API}auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  const data = await respones.json();

  if (respones.status !== 201) throw data;

  return data;
};
