import { createContext, useContext } from 'react';

type TasksContextProps = {};

export const AuthContext = createContext<AuthContextProps>(
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  {} as AuthContextProps,
);
export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
