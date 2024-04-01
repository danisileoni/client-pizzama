import {
  type DataLogin,
  type AuthAPIRegister,
  type DataRegister,
  type AuthAPILogin,
  type VerificationToken,
} from '../types';

const API = 'http://localhost:3000/api/auth';

export const authRegister = async (
  userData: DataRegister,
): Promise<AuthAPIRegister> => {
  const response = await fetch(`${API}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
    credentials: 'include',
  });
  const data = await response.json();

  if (response.status !== 201) throw data;

  return data;
};

export const authLogin = async (userData: DataLogin): Promise<AuthAPILogin> => {
  const response = await fetch(`${API}/login`, {
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
  const response = await fetch(`${API}/verify`, {
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

export const authRefreshToken = async (): Promise<VerificationToken> => {
  const response = await fetch(`${API}/refresh`, {
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

export const getAll = async (token: string): Promise<AuthAPIRegister[]> => {
  const response = await fetch(API, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (response.status !== 200) throw data;

  return data;
};

export const getUserActive = async (
  token: string,
): Promise<AuthAPIRegister> => {
  const response = await fetch(`${API}/user/active`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    credentials: 'include',
  });

  const data = await response.json();

  if (response.status !== 200) throw data;

  return data;
};
