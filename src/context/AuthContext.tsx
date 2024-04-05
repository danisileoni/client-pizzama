import { useEffect, useReducer, useState } from 'react';
import {
  type ErrorMessage,
  type DataRegister,
  type DataLogin,
  type AuthManagementReducer,
  type UserUpdate,
} from '../types.d';
import {
  authLogin,
  authLogout,
  authRefreshToken,
  authRegister,
  authVerifyRequest,
  getAll,
  getOne,
  getUserActive,
  patchUpdateUser,
} from '../services/authApi';
import { AuthContext } from '../hooks/useAuth';
import Cookies from 'js-cookie';

interface props {
  children: JSX.Element | JSX.Element[];
}

const enum ActionData {
  FETCH_START = 'FETCH_START',
  CHECK_IS_NOT_VALID = 'CHECK_IS_NOT_VALID',
  CHECK_IS_VALID = 'CHECK_IS_VALID',
  FETCH_REGISTER = 'FETCH_REGISTER',
  FETCH_LOGIN = 'FETCH_LOGIN',
  FETCH_FIND_ALL = 'FETCH_FIND_ALL',
  FETCH_FIND_ONE = 'FETCH_FIND_ONE',
  FETCH_ACTIVE_USER = 'FETCH_ACTIVE_USER',
  FETCH_UPDATE = 'FETCH_UPDATE',
  FETCH_LOGOUT = 'FETCH_LOGOUT',
  FETCH_ERROR = 'FETCH_ERROR',
}

type Action = { type: string; payload?: any };

const initialState = {
  loading: true,
  authenticated: false,
  userData: undefined,
  findAll: undefined,
  findOne: undefined,
  activeData: undefined,
  update: undefined,
  error: undefined,
};

const authManagementReducer: React.Reducer<AuthManagementReducer, Action> = (
  state,
  action,
) => {
  switch (action.type) {
    case 'FETCH_START':
      return {
        ...state,
        loading: true,
        error: undefined,
      };
    case 'CHECK_IS_NOT_VALID':
      return {
        ...state,
        loading: false,
        authenticated: false,
        userData: undefined,
        error: undefined,
      };
    case 'CHECK_IS_VALID':
      return {
        ...state,
        loading: false,
        authenticated: true,
        userData: action.payload,
        error: undefined,
      };
    case 'FETCH_REGISTER':
      return {
        ...state,
        authenticated: true,
        userData: action.payload,
        error: undefined,
      };
    case 'FETCH_LOGIN':
      return {
        ...state,
        authenticated: true,
        userData: action.payload,
        error: undefined,
      };
    case 'FETCH_FIND_ALL':
      return {
        ...state,
        loading: false,
        findAll: action.payload,
        error: undefined,
      };
    case 'FETCH_FIND_ONE':
      return {
        ...state,
        loading: false,
        findOne: action.payload,
        error: undefined,
      };
    case 'FETCH_ACTIVE_USER':
      return {
        ...state,
        loading: false,
        activeData: action.payload,
        error: undefined,
      };
    case 'FETCH_LOGOUT':
      return {
        ...state,
        login: false,
        authenticated: false,
      };
    case 'FETCH_UPDATE':
      return {
        ...state,
        update: action.payload,
        error: undefined,
      };
    case 'FETCH_ERROR':
      return {
        ...state,
        update: undefined,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }: props): JSX.Element => {
  const [state, dispatch] = useReducer(authManagementReducer, initialState);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>();

  useEffect(() => {
    if (state.error?.statusCode === 409) {
      const emailOrUser = state.error?.message?.split(/[ "\/\{\}:\\]+/);
      const errorType = emailOrUser?.find(
        (error: string) => error === 'email' || error === 'user',
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

    if (state.error?.message === 'Credentials are not valid') {
      setErrorMessage({ message: state.error?.message });
      const timeoutId = setTimeout(() => {
        setErrorMessage({ message: undefined });
      }, 3000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [state.error]);

  useEffect(() => {
    const checkIsValidate = async (): Promise<void> => {
      const cookies = Cookies.get();
      if (!cookies.token) {
        dispatch({ type: ActionData.CHECK_IS_NOT_VALID });
        return;
      }

      try {
        const res = await authVerifyRequest();
        dispatch({ type: ActionData.CHECK_IS_VALID, payload: res });
      } catch (error: any) {
        dispatch({ type: ActionData.CHECK_IS_NOT_VALID });
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
      dispatch({ type: ActionData.FETCH_REGISTER, payload: res });
    } catch (error) {
      dispatch({ type: ActionData.FETCH_ERROR, payload: error });
    }
  };

  const login = async (user: DataLogin): Promise<void> => {
    try {
      const res = await authLogin(user);
      dispatch({ type: ActionData.FETCH_LOGIN, payload: res });
    } catch (error) {
      dispatch({ type: ActionData.FETCH_ERROR, payload: error });
    }
  };

  const getAllUsers = async (): Promise<void> => {
    try {
      const cookies = Cookies.get();
      const res = await getAll(cookies.token);
      dispatch({ type: ActionData.FETCH_FIND_ALL, payload: res });
    } catch (error) {
      dispatch({ type: ActionData.FETCH_ERROR, payload: error });
    }
  };

  const getActive = async (): Promise<void> => {
    try {
      const cookies = Cookies.get();
      const res = await getUserActive(cookies.token);
      dispatch({ type: ActionData.FETCH_ACTIVE_USER, payload: res });
    } catch (error) {
      dispatch({ type: ActionData.FETCH_ERROR, payload: error });
    }
  };

  const getOneUser = async (id: string): Promise<void> => {
    try {
      const cookies = Cookies.get();
      const res = await getOne(cookies.token, id);
      dispatch({ type: ActionData.FETCH_FIND_ONE, payload: res });
    } catch (error) {
      dispatch({ type: ActionData.FETCH_ERROR, payload: error });
    }
  };

  const updateUser = async (id: string, data: UserUpdate): Promise<void> => {
    try {
      const cookies = Cookies.get();
      const res = await patchUpdateUser(cookies.token, id, data);
      dispatch({ type: ActionData.FETCH_UPDATE, payload: res });
    } catch (error) {
      dispatch({ type: ActionData.FETCH_ERROR, payload: error });
    }
  };

  const logout = async (): Promise<void> => {
    try {
      const cookies = Cookies.get();
      await authLogout(cookies.token);
      dispatch({ type: ActionData.FETCH_LOGOUT });
    } catch (error) {
      dispatch({ type: ActionData.FETCH_ERROR, payload: error });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        register,
        login,
        getAllUsers,
        getOneUser,
        getActive,
        updateUser,
        logout,
        state,
        errorMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
