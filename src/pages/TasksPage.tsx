import { useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { useTasks } from '../hooks/useTasks';
import { Link } from 'react-router-dom';
import { useProject } from '../hooks/useProjects';

export const TasksPage = (): JSX.Element => {
  const { getForUser, state: stateTasks } = useTasks();
  const { findAll: findAllProjects, state: stateProjects } = useProject();
  const { findForUser: tasksUser } = stateTasks;
  const { findAll: allProjects } = stateProjects;

  useEffect(() => {
    async function fetchs(): Promise<void> {
      await getForUser();
      await findAllProjects();
    }
    void fetchs();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-col max-w-6xl mt-5 m-auto mb-10">
        <h1 className="text-2xl font-semibold">You tasks</h1>
        <div>
          {tasksUser?.map((task) => {
            let data;
            if (allProjects) {
              data = allProjects.find((project) =>
                project.assignedTasks.includes(task._id),
              );
            }

            return (
              <Link
                to={`/platform/task/${task._id}`}
                className="bg-zinc-800 flex rounded-xl flex-col hover:-translate-y-1 hover:transition-all hover:bg-zinc-700 p-5 mt-3 shadow-xl"
                key={task._id}
              >
                <h3 className="text-md font-semibold">{task.title}</h3>
                <h5 className="text-sm">{task.backOrFront}</h5>
                <div className="flex justify-between">
                  <h5 className="text-sm">{data?.name}</h5>
                  <span className="text-sm">
                    start: {task.startDate.split('T')[0]} - end:{' '}
                    {task.endDate.split('T')[0]}
                  </span>
                </div>
                <p className="text-xs whitespace-nowrap overflow-hidden text-ellipsis">
                  {task.description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};
