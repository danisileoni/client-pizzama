import { useParams, Link } from 'react-router-dom';
import { Navbar } from './Navbar';
import { useTasks } from '../hooks/useTasks';
import { useEffect } from 'react';
import { useProject } from '../hooks/useProjects';
export const DetailsTasks = (): JSX.Element => {
  const { taskId } = useParams();
  const { getOne: getOneTask, state: stateTask } = useTasks();
  const { findOne: getOneProject, state: stateProject } = useProject();
  const { findOne: findOneTask } = stateTask;
  const { findOne: findOneProject } = stateProject;

  useEffect(() => {
    void (async (): Promise<void> => {
      if (taskId && !findOneTask) {
        await getOneTask(taskId);
      }
      if (findOneTask) {
        await getOneProject(findOneTask?.projectId[0]);
      }
    })();
  }, [findOneTask]);

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:max-w-5xl m-auto mt-5">
        <h1 className="text-2xl font-semibold">{findOneTask?.title}</h1>
        <h5 className="text-md">
          Project:{' '}
          <Link
            className="text-md text-blue-500"
            to={`/platform/project/${findOneProject?._id}`}
          >
            {findOneProject?.name}
          </Link>
        </h5>
        <div className="flex justify-between">
          <h5 className="text-sm">Type of task: {findOneTask?.backOrFront}</h5>
          <div className="flex flex-col">
            <span className="text-xs text-end">
              Start task: {findOneTask?.startDate.split('T')[0]}
            </span>
            <span className="text-xs text-end">
              Finish Task: {findOneTask?.endDate.split('T')[0]}
            </span>
          </div>
        </div>
        <h4 className="font-semibold text-lg">Description:</h4>
        <p className="bg-zinc-800 p-3 rounded-md">{findOneTask?.description}</p>
      </div>
    </>
  );
};
