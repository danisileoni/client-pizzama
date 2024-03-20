import { useEffect, useState } from 'react';
import {
  type ErrorApi,
  type AuthAPIRegister,
  type ErrorMessage,
  type DataRegister,
} from '../types.d';
import { authRegister } from '../services/authApi';
import { AuthContext } from '../hooks/useAuth';

interface props {
  children: JSX.Element | JSX.Element[];
}

export const AuthProvider = ({ children }: props): JSX.Element => {
  const [user, setUser] = useState<AuthAPIRegister>();
  const [errorApi, setErrorApi] = useState<ErrorApi>();
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const emailOrUser = errorApi?.message?.split(/[ "\/\{\}:\\]+/);
    const errorType = emailOrUser?.find(
      (error) => error === 'email' || error === 'user',
    );

    if (errorType === 'user') {
      setErrorMessage({ message: 'existing user' });
    } else if (errorType === 'email') {
      setErrorMessage({ message: 'existing email' });
    }

    if (errorType != null) {
      const timeoutId = setTimeout(() => {
        setErrorMessage({ message: undefined });
      }, 3000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [errorApi]);

  const register = async (user: DataRegister): Promise<void> => {
    try {
      const res = await authRegister(user);
      setUser(res);
      setIsAuthenticated(true);
    } catch (error: any) {
      setErrorApi({
        message: error.message,
        statusCode: error.statusCode,
        error: error.error,
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{ register, user, errorApi, errorMessage, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
