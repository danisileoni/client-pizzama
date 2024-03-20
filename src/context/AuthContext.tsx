import { createContext, useContext, useState } from 'react';
import { type AuthAPIRegister } from '../types.d';
import { type Data } from '../types';
import { authRegister } from '../services/authApi';

interface props {
  children: JSX.Element | JSX.Element[];
}

type AuthContextProps = {
  register: (user: Data) => Promise<void>;
  user: AuthAPIRegister | undefined;
};

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

export const AuthProvider = ({ children }: props): JSX.Element => {
  const [user, setUser] = useState<AuthAPIRegister>();

  const register = async (user: Data): Promise<void> => {
    const res = await authRegister(user);
    setUser(res);
  };

  return (
    <AuthContext.Provider value={{ register, user }}>
      {children}
    </AuthContext.Provider>
  );
};
