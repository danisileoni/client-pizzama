import { useReducer } from 'react';
import { type DataManagmentReducer } from '../types';
import { TasksContext } from '../hooks/useTasks';

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

const taskDataManagmentReducer = (
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

export const TasksProvider = ({ children }: props): JSX.Element => {
  const [state, dispatch] = useReducer(taskDataManagmentReducer, initialState);

  return (
    <TasksContext.Provider value={{ state }}>{children}</TasksContext.Provider>
  );
};
