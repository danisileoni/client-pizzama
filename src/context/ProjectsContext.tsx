import { useReducer, useState } from 'react';
import { ProjectsContext } from '../hooks/useProjects';
import {
  getAllProjects,
  getAllScrollProjects,
  getOneProject,
} from '../services/projectsApi';
import Cookies from 'js-cookie';
import { type ProjectApi, type ProjectManagmentReducer } from '../types';

interface props {
  children: JSX.Element | JSX.Element[];
}

const enum ActionData {
  FETCH_START = 'FETCH_START',
  FETCH_ONE_SUCCESS = 'FETCH_ONE_SUCCESS',
  FETCH_ALL_SUCCESS = 'FETCH_ALL_SUCCESS',
  FETCH_ERROR = 'FETCH_ERROR',
}

type Action = { type: string; payload?: any };

const initialState = {
  loading: false,
  findOne: undefined,
  findAll: undefined,
  error: undefined,
};

const projectDataManagmentReducer: React.Reducer<
  ProjectManagmentReducer,
  Action
> = (
  state: ProjectManagmentReducer,
  action: Action,
): ProjectManagmentReducer => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true };
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
        error: action.payload,
      };
    default:
      return state;
  }
};

export const ProjectsProvider = ({ children }: props): JSX.Element => {
  const [state, dispatch] = useReducer(
    projectDataManagmentReducer,
    initialState,
  );
  const [offset, setOffset] = useState(0);
  // TODO: convert data in state of useReducer
  const [data, setData] = useState<ProjectApi[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const handleBtnForOffset = (): void => {
    setOffset((prevOffset) => prevOffset + 9);
  };

  const viewMoreProject = async (): Promise<void> => {
    if (hasMore) {
      try {
        const cookies = Cookies.get();
        const res = await getAllScrollProjects(cookies.token, offset);
        setData((prevData) => prevData.concat(res));
        if (res.length < 9) setHasMore(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const findAll = async (): Promise<void> => {
    try {
      dispatch({ type: ActionData.FETCH_START });
      const cookies = Cookies.get();
      const res = await getAllProjects(cookies.token);
      dispatch({ type: ActionData.FETCH_ALL_SUCCESS, payload: res });
    } catch (error) {
      dispatch({ type: ActionData.FETCH_ERROR, payload: error });
    }
  };

  const findOne = async (slug: string): Promise<void> => {
    try {
      dispatch({ type: ActionData.FETCH_START });
      const cookies = Cookies.get();
      const res = await getOneProject(cookies.token, slug);
      dispatch({ type: ActionData.FETCH_ONE_SUCCESS, payload: res });
    } catch (error) {
      dispatch({ type: ActionData.FETCH_ERROR, payload: error });
    }
  };

  return (
    <ProjectsContext.Provider
      value={{
        findAll,
        viewMoreProject,
        handleBtnForOffset,
        findOne,
        state,
        data,
        hasMore,
        offset,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};
