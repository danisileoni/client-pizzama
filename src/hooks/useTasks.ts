import { createContext, useContext } from 'react';

type TasksContextProps = {};

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
