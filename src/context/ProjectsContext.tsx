import { useReducer, useState } from 'react';
import { ProjectsContext } from '../hooks/useProjects';
import { getAllProjects, getAllScrollProjects } from '../services/projectsApi';
import Cookies from 'js-cookie';
import { type ProjectApi, type DataManagmentReducer } from '../types';

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

const projectDataManagmentReducer: React.Reducer<
  DataManagmentReducer,
  Action
> = (state: DataManagmentReducer, action: Action): DataManagmentReducer => {
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
  const [state, dispatch] = useReducer(
    projectDataManagmentReducer,
    initialState,
  );
  const [offset, setOffset] = useState(0);
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
      dispatch({ type: ActionData.FETCH_SUCCESS, payload: res });
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
