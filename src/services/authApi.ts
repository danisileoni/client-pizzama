import {
  type DataLogin,
  type AuthAPIRegister,
  type DataRegister,
  type AuthAPILogin,
  type VerificationToken,
} from '../types';

const API = 'http://localhost:3000/api/';

export const authRegister = async (
  userData: DataRegister,
): Promise<AuthAPIRegister> => {
  const response = await fetch(`${API}auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  const data = await response.json();

  if (response.status !== 201) throw data;

  return data;
};

export const authLogin = async (userData: DataLogin): Promise<AuthAPILogin> => {
  const response = await fetch(`${API}auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
    credentials: 'include',
  });
  const data = await response.json();

  if (response.status !== 200) throw data;

  return data;
};

export const authVerifyRequest = async (): Promise<VerificationToken> => {
  const response = await fetch(`${API}auth/verify`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  const data = await response.json();

  if (response.status !== 200) throw data;

  return data;
};
