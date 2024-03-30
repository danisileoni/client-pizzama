import { createContext, useContext } from 'react';
import { type ProjectApi, type ProjectManagmentReducer } from '../types';

type ProjectsContextProps = {
  findAll: () => Promise<void>;
  findOne: (slug: string) => Promise<void>;
  viewMoreProject: () => Promise<void>;
  handleBtnForOffset: () => void;
  state: ProjectManagmentReducer;
  data: ProjectApi[];
  offset: number;
  hasMore: boolean;
};

export const ProjectsContext = createContext(
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  {} as ProjectsContextProps,
);
export const useProject = (): ProjectsContextProps => {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error('useProject must be used within an ProjectProvider');
  }
  return context;
};
