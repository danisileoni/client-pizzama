import { useReducer, useState } from 'react';
import { ProjectsContext } from '../hooks/useProjects';
import {
  getAllProjects,
  getAllScrollProjects,
  getOneProject,
  getProjectForUser,
  postCreateProject,
} from '../services/projectsApi';
import Cookies from 'js-cookie';
import { type ProjectApi, type ProjectManagementReducer } from '../types';

interface props {
  children: JSX.Element | JSX.Element[];
}

const enum ActionData {
  FETCH_START = 'FETCH_START',
  FETCH_CREATE = 'FETCH_CREATE',
  FETCH_ONE_SUCCESS = 'FETCH_ONE_SUCCESS',
  FETCH_ALL_SUCCESS = 'FETCH_ALL_SUCCESS',
  FETCH_FOR_USER_SUCCESS = 'FETCH_FOR_USER_SUCCESS',
  FETCH_ERROR = 'FETCH_ERROR',
}

type Action = { type: string; payload?: any };

const initialState = {
  loading: false,
  newProject: undefined,
  findOne: undefined,
  findAll: undefined,
  findForUser: undefined,
  error: undefined,
};

const projectDataManagementReducer: React.Reducer<
  ProjectManagementReducer,
  Action
> = (
  state: ProjectManagementReducer,
  action: Action,
): ProjectManagementReducer => {
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
    case 'FETCH_FOR_USER_SUCCESS':
      return {
        ...state,
        loading: false,
        findForUser: action.payload,
        error: undefined,
      };
    case 'FETCH_CREATE':
      return {
        ...state,
        loading: false,
        newProject: action.payload,
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
    projectDataManagementReducer,
    initialState,
  );
  const [offset, setOffset] = useState(0);
  // TODO: convert data in state of useReducer
  const [data, setData] = useState<ProjectApi[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const handleBtnForOffset = (): void => {
    setOffset((prevOffset) => prevOffset + 9);
  };

  const createProject = async (data: ProjectApi): Promise<void> => {
    dispatch({ type: ActionData.FETCH_START });
    try {
      const cookies = Cookies.get();
      const res = await postCreateProject(cookies.token, data);
      dispatch({ type: ActionData.FETCH_CREATE, payload: res });
    } catch (error) {
      dispatch({ type: ActionData.FETCH_ERROR, payload: error });
      throw Error(error);
    }
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
    dispatch({ type: ActionData.FETCH_START });
    try {
      const cookies = Cookies.get();
      const res = await getAllProjects(cookies.token);
      dispatch({ type: ActionData.FETCH_ALL_SUCCESS, payload: res });
    } catch (error) {
      dispatch({ type: ActionData.FETCH_ERROR, payload: error });
    }
  };

  const findOne = async (slug: string): Promise<void> => {
    dispatch({ type: ActionData.FETCH_START });
    try {
      const cookies = Cookies.get();
      const res = await getOneProject(cookies.token, slug);
      dispatch({ type: ActionData.FETCH_ONE_SUCCESS, payload: res });
    } catch (error) {
      dispatch({ type: ActionData.FETCH_ERROR, payload: error });
    }
  };

  const findForUser = async (): Promise<void> => {
    dispatch({ type: ActionData.FETCH_START });
    try {
      const cookies = Cookies.get();
      const res = await getProjectForUser(cookies.token);
      dispatch({ type: ActionData.FETCH_FOR_USER_SUCCESS, payload: res });
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
        findForUser,
        createProject,
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
