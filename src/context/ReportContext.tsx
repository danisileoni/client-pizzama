import { useReducer } from 'react';
import { type ReportManagmentReducer } from '../types';
import { ReportContext } from '../hooks/useReport';
import {
  getAllReports,
  getLatestReports,
  getOneReport,
} from '../services/reportsApi';
import Cookies from 'js-cookie';

interface props {
  children: JSX.Element | JSX.Element[];
}

type Action = { type: string; payload?: any };

const enum ActionData {
  FETCH_START = 'FETCH_START',
  FETCH_ONE_SUCCESS = 'FETCH_ONE_SUCCESS',
  FETCH_ALL_SUCCESS = 'FETCH_ALL_SUCCESS',
  FETCH_LATEST_SUCCESS = 'FETCH_LATEST_SUCCESS',
  FETCH_ERROR = 'FETCH_ERROR',
}

const initialState = {
  loading: false,
  findOne: undefined,
  findAll: undefined,
  findLatest: undefined,
  error: undefined,
};

const reportDataManagmentReducer = (
  state: ReportManagmentReducer,
  action: Action,
): ReportManagmentReducer => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true };
    case 'FETCH_LATEST_SUCCESS':
      return {
        ...state,
        loading: false,
        findLatest: action.payload,
        error: undefined,
      };
    case 'FETCH_ONE_SUCCESS':
      return {
        ...state,
        loading: false,
        findOne: action.payload,
        error: undefined,
      };
    case 'FETCH_ALL_SUCCESS':
      return {
        ...state,
        loading: false,
        findAll: action.payload,
        error: undefined,
      };
    case 'FETCH_ERROR':
      return {
        ...state,
        loading: false,
        findAll: undefined,
        findOne: undefined,
        findLatest: undefined,
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

  const findLatest = async (): Promise<void> => {
    dispatch({ type: ActionData.FETCH_START });
    try {
      const cookies = Cookies.get();
      const res = await getLatestReports(cookies.token);
      dispatch({ type: ActionData.FETCH_LATEST_SUCCESS, payload: res });
    } catch (error) {
      dispatch({ type: ActionData.FETCH_ERROR, payload: error });
    }
  };

  const findAll = async (): Promise<void> => {
    dispatch({ type: ActionData.FETCH_START });
    try {
      const cookies = Cookies.get();
      const res = await getAllReports(cookies.token);
      dispatch({ type: ActionData.FETCH_ALL_SUCCESS, payload: res });
    } catch (error) {
      dispatch({ type: ActionData.FETCH_ERROR, payload: error });
    }
  };

  const findOne = async (id: string): Promise<void> => {
    dispatch({ type: ActionData.FETCH_START });
    try {
      const cookies = Cookies.get();
      const res = await getOneReport(cookies.token, id);
      dispatch({ type: ActionData.FETCH_ONE_SUCCESS, payload: res });
    } catch (error) {
      dispatch({ type: ActionData.FETCH_ERROR, payload: error });
    }
  };

  return (
    <ReportContext.Provider value={{ findLatest, findAll, findOne, state }}>
      {children}
    </ReportContext.Provider>
  );
};
