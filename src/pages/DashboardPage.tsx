import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import { useProject } from '../hooks/useProjects';
import { useTasks } from '../hooks/useTasks';
import { Dashboard } from '../components/dashboard/Dashboard';

export const DashboardPage = (): JSX.Element => {
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

  useEffect(() => {
    if (stateAuth.activeData) {
      if (!stateAuth.activeData.roles.includes('admin')) {
        navigate(-1);
      }
    }
  }, [stateAuth.activeData]);

  return (
    <>
      <div className="grid grid-flow-col md:grid-cols- md:grid-rows-6 h-screen">
        <div className="flex flex-col bg-indigo-700 justify-center">
          <Link
            to={'/platform'}
            className=" text-4xl row-span-1 font-semibold flex justify-center items-center"
          >
            Pizzama
          </Link>
        </div>
        <ul className="row-span-5 text-lg bg-indigo-700">
          <h4 className="text-xl pl-1">Menu:</h4>
          <li>
            <button className="pl-2 hover:bg-indigo-800 hover:translate-x-2 transition-all w-full text-left">
              {'❯'} Dashboard
            </button>
          </li>
          <li>
            <button className="pl-2 hover:bg-indigo-800 hover:translate-x-2 transition-all w-full text-left">
              {'❯'} Create Projects
            </button>
          </li>
          <li>
            <button className="pl-2 hover:bg-indigo-800 hover:translate-x-2 transition-all w-full text-left">
              {'❯'} Create Tasks
            </button>
          </li>
          <li>
            <button className="pl-2 hover:bg-indigo-800 hover:translate-x-2 transition-all w-full text-left">
              {'❯'} View Reports
            </button>
          </li>
          <li>
            <button className="pl-2 hover:bg-indigo-800 hover:translate-x-2 transition-all w-full text-left">
              {'❯'} View Users
            </button>
          </li>
          <li>
            <button className="pl-2 hover:bg-indigo-800 hover:translate-x-2 transition-all w-full text-left">
              {'❯'} Delete User
            </button>
          </li>
        </ul>
        <Dashboard
          tasks={stateTasks.findAll as []}
          projects={stateProjects.findAll as []}
        />
      </div>
    </>
  );
};
