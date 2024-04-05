import { type ProjectApi } from '../types';

const API = 'http://localhost:3000/api/projects';

export const postCreateProject = async (
  token: string,
  dataProject: ProjectApi,
): Promise<ProjectApi> => {
  const response = await fetch(`${API}/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    credentials: 'include',
    body: JSON.stringify(dataProject),
  });

  const data = await response.json();

  console.log(data);

  if (response.status !== 201) throw data;

  return data;
};

export const getAllProjects = async (token: string): Promise<ProjectApi> => {
  const response = await fetch(`${API}`, {
    method: 'GET',
    headers: {
      // eslint-disable-next-line prettier/prettier
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (response.status !== 200) throw data;

  return data;
};

export const getAllScrollProjects = async (
  token: string,
  offset: number,
): Promise<ProjectApi[]> => {
  const response = await fetch(`${API}/?offset=${offset}&limit=9`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (response.status !== 200) throw data;

  return data;
};

export const getOneProject = async (
  token: string,
  slug: string,
): Promise<ProjectApi> => {
  const response = await fetch(`${API}/${slug}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (response.status !== 200) throw data;

  return data;
};

export const getProjectForUser = async (token: string): Promise<ProjectApi> => {
  const response = await fetch(`${API}/user/for-user`, {
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
