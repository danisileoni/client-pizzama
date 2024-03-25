import { useReducer } from 'react';
import { type DataManagmentReducer } from '../types';
import { ReportContext } from '../hooks/useReport';
import { getAllReports } from '../services/reportsApi';
import Cookies from 'js-cookie';

interface props {
  children: JSX.Element | JSX.Element[];
}

type Action = { type: string; payload?: any };

const initialState = {
  loading: false,
  data: undefined,
  error: undefined,
};

const enum ActionData {
  FETCH_START = 'FETCH_START',
  FETCH_SUCCESS = 'FETCH_SUCCESS',
  FETCH_ERROR = 'FETCH_ERROR',
}

const reportDataManagmentReducer = (
  state: DataManagmentReducer,
  action: Action,
): DataManagmentReducer => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: undefined,
      };
    case 'FETCH_ERROR':
      return {
        ...state,
        loading: false,
        data: undefined,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const RerportProvider = ({ children }: props): JSX.Element => {
  const [state, dispatch] = useReducer(
    reportDataManagmentReducer,
    initialState,
  );

  const findAll = async (): Promise<void> => {
    dispatch({ type: ActionData.FETCH_START });
    try {
      const cookies = Cookies.get();
      const res = await getAllReports(cookies.token);
      dispatch({ type: ActionData.FETCH_SUCCESS, payload: res });
    } catch (error) {
      dispatch({ type: ActionData.FETCH_ERROR, payload: error });
    }
  };

  return (
    <ReportContext.Provider value={{ findAll, state }}>
      {children}
    </ReportContext.Provider>
  );
};
