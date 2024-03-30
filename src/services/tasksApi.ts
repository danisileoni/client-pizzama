import { type TasksAPI } from "../types";

const API = 'http://localhost:3000/api/tasks';

export const getTaskForUser = async (token: string): Promise<TasksAPI> => {
  const response = await fetch(`${API}/for-user`, {
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
