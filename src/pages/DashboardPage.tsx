import { useEffect, useReducer } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import { useProject } from '../hooks/useProjects';
import { useTasks } from '../hooks/useTasks';
import { Dashboard } from '../components/dashboard/Dashboard';
import { CreateProject } from '../components/dashboard/CreateProject';

interface DataSelected {
  dashboard: boolean;
  createProject: boolean;
  createTask: boolean;
  viewReports: boolean;
  viewUsers: boolean;
  DeleteUser: boolean;
}

type Action = { type: string; payload?: any };

const notStorageReducer = {
  dashboard: true,
  createProject: false,
  createTask: false,
  viewReports: false,
  viewUsers: false,
  DeleteUser: false,
};
const storageReducer = localStorage.getItem('page');

const initialReducer = (): DataSelected => {
  if (storageReducer) {
    return JSON.parse(storageReducer);
  }
  return notStorageReducer;
};

const enum ActionSelected {
  SELECTED_DASHBOARD = 'SELECTED_DASHBOARD',
  SELECTED_CRE_PROJECT = 'SELECTED_CRE_PROJECT',
  SELECTED_CRE_TASKS = 'SELECTED_CRE_TASKS',
  SELECTED_VIEW_REPORTS = 'SELECTED_VIEW_REPORTS',
  SELECTED_VIEW_USERS = 'SELECTED_VIEW_USERS',
  SELECTED_DELETE_USER = 'SELECTED_DELETE_USER',
}

const selectedSectionReducer: React.Reducer<DataSelected, Action> = (
  state,
  action,
) => {
  switch (action.type) {
    case 'SELECTED_DASHBOARD':
      return {
        dashboard: true,
        createProject: false,
        createTask: false,
        viewReports: false,
        viewUsers: false,
        DeleteUser: false,
      };
    case 'SELECTED_CRE_PROJECT':
      return {
        dashboard: false,
        createProject: true,
        createTask: false,
        viewReports: false,
        viewUsers: false,
        DeleteUser: false,
      };
    case 'SELECTED_CRE_TASKS':
      return {
        dashboard: false,
        createProject: false,
        createTask: true,
        viewReports: false,
        viewUsers: false,
        DeleteUser: false,
      };
    case 'SELECTED_VIEW_REPORTS':
      return {
        dashboard: false,
        createProject: false,
        createTask: false,
        viewReports: true,
        viewUsers: false,
        DeleteUser: false,
      };
    case 'SELECTED_VIEW_USERS':
      return {
        dashboard: false,
        createProject: false,
        createTask: false,
        viewReports: false,
        viewUsers: true,
        DeleteUser: false,
      };
    case 'SELECTED_DELETE_USER':
      return {
        dashboard: false,
        createProject: false,
        createTask: false,
        viewReports: false,
        viewUsers: false,
        DeleteUser: true,
      };
    default:
      return state;
  }
};

const DashboardPage = (): JSX.Element => {
  const [state, dispatch] = useReducer(
    selectedSectionReducer,
    initialReducer(),
  );
  const { state: stateAuth, getActive } = useAuth();
  const { state: stateProjects, findAll: findAllProjects } = useProject();
  const { state: stateTasks, findAll: findAllTasks } = useTasks();
  const navigate = useNavigate();

  useEffect(() => {
    void (async () => {
      await getActive();
      await findAllProjects();
      await findAllTasks();
    })();
  }, []);
  localStorage.setItem('page', JSON.stringify(state));

  useEffect(() => {
    if (stateAuth.activeData) {
      if (!stateAuth.activeData.roles.includes('admin')) {
        navigate(-1);
      }
    }
  }, [stateAuth.activeData]);

  return (
    <>
      <div className="grid grid-flow-col md:grid-cols-9 md:grid-rows-8 h-screen">
        <div className="flex flex-col bg-indigo-700 justify-center shadow-2xl">
          <Link
            to={'/platform'}
            className=" text-2xl row-span-1 font-semibold flex justify-center items-center"
          >
            Pizzama
          </Link>
        </div>
        <ul className="row-span-7 text-lg bg-indigo-700 shadow-2xl">
          <h4 className="text-2xl pl-4">Menu</h4>
          <li>
            <button
              onClick={() => {
                dispatch({ type: ActionSelected.SELECTED_DASHBOARD });
              }}
              className="pl-2 hover:bg-indigo-800 hover:translate-x-2 transition-all w-full text-lg p-2 text-left"
            >
              {'❯'} Dashboard
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                dispatch({ type: ActionSelected.SELECTED_CRE_PROJECT });
              }}
              className="pl-2 hover:bg-indigo-800 hover:translate-x-2 transition-all w-full text-lg p-2 text-left"
            >
              {'❯'} Create Projects
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                dispatch({ type: ActionSelected.SELECTED_CRE_TASKS });
              }}
              className="pl-2 hover:bg-indigo-800 hover:translate-x-2 transition-all w-full text-lg p-2 text-left"
            >
              {'❯'} Create Tasks
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                dispatch({ type: ActionSelected.SELECTED_VIEW_REPORTS });
              }}
              className="pl-2 hover:bg-indigo-800 hover:translate-x-2 transition-all w-full text-lg p-2 text-left"
            >
              {'❯'} View Reports
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                dispatch({ type: ActionSelected.SELECTED_VIEW_USERS });
              }}
              className="pl-2 hover:bg-indigo-800 hover:translate-x-2 transition-all w-full text-lg p-2 text-left"
            >
              {'❯'} View Users
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                dispatch({ type: ActionSelected.SELECTED_DELETE_USER });
              }}
              className="pl-2 hover:bg-indigo-800 hover:translate-x-2 transition-all w-full text-lg p-2 text-left"
            >
              {'❯'} Delete User
            </button>
          </li>
        </ul>
        {state.dashboard ? (
          <Dashboard
            tasks={stateTasks.findAll as []}
            projects={stateProjects.findAll as []}
          />
        ) : null}
        {state.createProject ? <CreateProject /> : null}
        {state.createTask ? <a>hello</a> : null}
      </div>
    </>
  );
};

export default DashboardPage;
