import { useEffect, useState } from 'react';
import {
  type ErrorApi,
  type ErrorMessage,
  type DataRegister,
  type DataLogin,
  type StateUserType,
} from '../types.d';
import {
  authLogin,
  authRefreshToken,
  authRegister,
  authVerifyRequest,
  getAll,
} from '../services/authApi';
import { AuthContext } from '../hooks/useAuth';
import Cookies from 'js-cookie';
interface props {
  children: JSX.Element | JSX.Element[];
}

export const AuthProvider = ({ children }: props): JSX.Element => {
  // TODO: convert in useReducer
  const [user, setUser] = useState<StateUserType | any>();
  const [errorApi, setErrorApi] = useState<ErrorApi>();
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (errorApi?.statusCode === 409) {
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
    }

    if (errorApi?.message === 'Credentials are not valid') {
      setErrorMessage({ message: errorApi?.message });
      const timeoutId = setTimeout(() => {
        setErrorMessage({ message: undefined });
      }, 3000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [errorApi]);

  useEffect(() => {
    const checkIsValidate = async (): Promise<void> => {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsLoading(false);
        setIsAuthenticated(false);
        setUser(null);
        return;
      }

      try {
        const res = await authVerifyRequest();
        setIsLoading(false);
        setIsAuthenticated(true);
        setUser(res);
        setIsLoading(false);
        setIsAuthenticated(true);
        setUser(res);
      } catch (error: any) {
        setIsLoading(false);
        setIsAuthenticated(false);
        setUser(null);
      }
    };

    checkIsValidate().catch((error) => error);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        await authRefreshToken();
      } catch (error) {
        console.log(error);
      }
    }, 7140000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

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

  const login = async (user: DataLogin): Promise<void> => {
    try {
      const res = await authLogin(user);
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

  const getAllUsers = async (): Promise<void> => {
    try {
      const cookies = Cookies.get();
      const res = await getAll(cookies.token);
      setUser(res);
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
      value={{
        register,
        login,
        getAllUsers,
        user,
        errorApi,
        errorMessage,
        isAuthenticated,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
