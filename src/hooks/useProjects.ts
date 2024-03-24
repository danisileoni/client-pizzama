import { createContext, useContext } from 'react';
import { type DataManagmentReducer } from '../types';

type ProjectsContextProps = {
  findAll: () => Promise<void>;
  state: DataManagmentReducer;
};

export const ProjectsContext = createContext(
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  {} as ProjectsContextProps,
);
export const useProject = (): ProjectsContextProps => {
  const context = useContext(ProjectsContext);
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (!context) {
    throw new Error('useProject must be used within an ProjectProvider');
  }
  return context;
};
