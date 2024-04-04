import { createContext, useContext } from 'react';
import { type TasksManagementReducer } from '../types';

type TasksContextProps = {
  getForUser: () => Promise<void>;
  getOne: (id: string) => Promise<void>;
  state: TasksManagementReducer;
};

export const TasksContext = createContext<TasksContextProps>(
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  {} as TasksContextProps,
);
export const useTasks = (): TasksContextProps => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error('useTasks must be used within an TasksProvider');
  }
  return context;
};
