import { createContext, useContext } from 'react';
import { type DataManagmentReducer } from '../types';

type ReportContextProps = {
  findAll: () => Promise<void>;
  state: DataManagmentReducer;
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
