import { type ReportsApi } from '../types';

const API = 'http://localhost:3000/api/reports';

export const getAllReports = async (token: string): Promise<ReportsApi> => {
  const response = await fetch(`${API}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  const data = await response.json();

  if (response.status !== 200) throw data;

  return data;
};
