import { createContext, useContext } from 'react';
import {
  type DataLogin,
  type AuthAPIRegister,
  type DataRegister,
  type ErrorApi,
  type ErrorMessage,
} from '../types';

type AuthContextProps = {
  register: (user: DataRegister) => Promise<void>;
  login: (user: DataLogin) => Promise<void>;
  getAllUsers: () => Promise<void>;
  user: AuthAPIRegister | undefined;
  errorApi: ErrorApi | undefined;
  errorMessage: ErrorMessage | undefined;
  isAuthenticated: boolean;
  isLoading: boolean;
};

export const AuthContext = createContext<AuthContextProps>(
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  {} as AuthContextProps,
);
export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
