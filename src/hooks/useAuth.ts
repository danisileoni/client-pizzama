import { createContext, useContext } from 'react';
import {
  type DataLogin,
  type DataRegister,
  type ErrorMessage,
  type AuthManagmentReducer,
} from '../types';

type AuthContextProps = {
  register: (user: DataRegister) => Promise<void>;
  login: (user: DataLogin) => Promise<void>;
  getAllUsers: () => Promise<void>;
  getActive: () => Promise<void>;
  logout: () => Promise<void>;
  state: AuthManagmentReducer;
  errorMessage: ErrorMessage | undefined;
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
