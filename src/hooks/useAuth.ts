import { createContext, useContext } from 'react';
import {
  type DataLogin,
  type DataRegister,
  type ErrorMessage,
  type AuthManagementReducer,
  type UserUpdate,
} from '../types';

type AuthContextProps = {
  register: (user: DataRegister) => Promise<void>;
  login: (user: DataLogin) => Promise<void>;
  getAllUsers: () => Promise<void>;
  getOneUser: (id: string) => Promise<void>;
  getActive: () => Promise<void>;
  updateUser: (id: string, data: UserUpdate) => Promise<void>;
  logout: () => Promise<void>;
  state: AuthManagementReducer;
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
