import { createContext, useContext } from 'react';
import { type ReportManagmentReducer } from '../types';

type ReportContextProps = {
  findAll: () => Promise<void>;
  findLatest: () => Promise<void>;
  findOne: (id: string) => Promise<void>;
  state: ReportManagmentReducer;
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
