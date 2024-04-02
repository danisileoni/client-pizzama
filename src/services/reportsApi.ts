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

export const getLatestReports = async (token: string): Promise<ReportsApi> => {
  const response = await fetch(`${API}/latest`, {
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

export const getOneReport = async (
  token: string,
  id: string,
): Promise<ReportsApi> => {
  const response = await fetch(`${API}/report/${id}`, {
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

export const postCreateReport = async (
  token: string,
  projectId: string,
  dataReport: object,
): Promise<ReportsApi> => {
  const response = await fetch(`${API}/create-report/${projectId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(dataReport),
    credentials: 'include',
  });

  const data = await response.json();

  console.log(data);

  if (response.status !== 201) throw data;

  return data;
};
