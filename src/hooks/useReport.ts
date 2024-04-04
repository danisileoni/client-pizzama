import { createContext, useContext } from 'react';
import { type ReportManagementReducer } from '../types';

type ReportContextProps = {
  findAll: () => Promise<void>;
  findLatest: () => Promise<void>;
  findOne: (id: string) => Promise<void>;
  createReport: (dataReport: object, projectId: string) => Promise<void>;
  state: ReportManagementReducer;
};

export const ReportContext = createContext<ReportContextProps>(
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  {} as ReportContextProps,
);

export const useReport = (): ReportContextProps => {
  const context = useContext(ReportContext);

  if (!context) {
    throw new Error('useReport must be used within an ReportProvider');
  }

  return context;
};
