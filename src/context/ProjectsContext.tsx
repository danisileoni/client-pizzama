import { useReducer } from 'react';
import { ProjectsContext } from '../hooks/useProjects';
import { getAllProjects } from '../services/projectsApi';
import Cookies from 'js-cookie';
import { type DataManagmentReducer } from '../types';

interface props {
  children: JSX.Element | JSX.Element[];
}

const enum ActionData {
  FETCH_START = 'FETCH_START',
  FETCH_SUCCESS = 'FETCH_SUCCESS',
  FETCH_ERROR = 'FETCH_ERROR',
}

type Action = { type: string; payload?: any };

const initialState = {
  loading: false,
  data: undefined,
  error: undefined,
};

const dataManagmentReducer: React.Reducer<DataManagmentReducer, Action> = (
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

export const ProjectsProvider = ({ children }: props): JSX.Element => {
  const [state, dispatch] = useReducer(dataManagmentReducer, initialState);

  const findAll = async (): Promise<void> => {
    dispatch({ type: ActionData.FETCH_START });
    const cookies = Cookies.get();
    const res = await getAllProjects(cookies.token);
    dispatch({ type: ActionData.FETCH_SUCCESS, payload: res });
  };

  return (
    <ProjectsContext.Provider value={{ findAll, state }}>
      {children}
    </ProjectsContext.Provider>
  );
};
