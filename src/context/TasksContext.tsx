import { useReducer } from 'react';
import { type TasksManagementReducer } from '../types';
import { TasksContext } from '../hooks/useTasks';
import Cookies from 'js-cookie';
import { getOneTask, getTaskForUser } from '../services/tasksApi';

interface props {
  children: JSX.Element | JSX.Element[];
}

type Action = { type: string; payload?: any };

const initialState = {
  loading: false,
  findOne: undefined,
  findAll: undefined,
  findForUser: undefined,
  error: undefined,
};

const enum ActionData {
  FETCH_START = 'FETCH_START',
  FETCH_ONE_SUCCESS = 'FETCH_ONE_SUCCESS',
  FETCH_ALL_SUCCESS = 'FETCH_ALL_SUCCESS',
  FETCH_FOR_USER_SUCCESS = 'FETCH_FOR_USER_SUCCESS',
  FETCH_ERROR = 'FETCH_ERROR',
}

const tasksDataManagementReducer: React.Reducer<
  TasksManagementReducer,
  Action
> = (state: TasksManagementReducer, action: Action): TasksManagementReducer => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true };
    case 'FETCH_FOR_USER_SUCCESS':
      return {
        ...state,
        loading: false,
        findForUser: action.payload,
        error: undefined,
      };
    case 'FETCH_ONE_SUCCESS':
      return {
        ...state,
        loading: false,
        findOne: action.payload,
        error: undefined,
      };
    case 'FETCH_ERROR':
      return {
        ...state,
        loading: false,
        findAll: undefined,
        findOne: undefined,
        findForUser: undefined,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const TasksProvider = ({ children }: props): JSX.Element => {
  const [state, dispatch] = useReducer(
    tasksDataManagementReducer,
    initialState,
  );

  const getOne = async (id: string): Promise<void> => {
    dispatch({ type: ActionData.FETCH_START });
    try {
      const cookies = Cookies.get();
      const res = await getOneTask(cookies.token, id);
      dispatch({ type: ActionData.FETCH_ONE_SUCCESS, payload: res });
    } catch (error) {
      dispatch({ type: ActionData.FETCH_ERROR, payload: error });
    }
  };

  const getForUser = async (): Promise<void> => {
    dispatch({ type: ActionData.FETCH_START });
    try {
      const cookies = Cookies.get();
      const res = await getTaskForUser(cookies.token);
      dispatch({ type: ActionData.FETCH_FOR_USER_SUCCESS, payload: res });
    } catch (error) {
      dispatch({ type: ActionData.FETCH_ERROR, payload: error });
    }
  };

  return (
    <TasksContext.Provider value={{ getForUser, getOne, state }}>
      {children}
    </TasksContext.Provider>
  );
};
