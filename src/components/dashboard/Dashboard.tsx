import { type ProjectApi, type TasksAPI } from '../../types';
import { Graphics } from '../Graphics';

type Props = {
  projects: ProjectApi[];
  tasks: TasksAPI[];
};

export const Dashboard = ({ projects, tasks }: Props): JSX.Element => {
  return (
    <>
      <h1 className="flex justify-center col-start-5 row-start-2 col-span-2 text-4xl">
        DASHBOARD
      </h1>
      <div className="flex col-start-3 col-span-3 row-start-3 justify-center  ">
        <div className="flex flex-col w-96 p-4 justify-center items-center border border-blue-400 rounded-lg bg-zinc-800">
          <h1 className="w-full text-4xl text-start">Total:</h1>
          <h4 className="w-full text-xl text-start">Projects</h4>
          <h1 className="text-5xl absolute -translate-y-0.5 text-blue-400 translate-x-7">
            {projects?.length}
          </h1>
        </div>
      </div>
      <div className="flex col-start-6 col-span-3 row-start-3 justify-center">
        <div className="flex flex-col w-96 p-4 justify-center items-center border border-blue-400 rounded-lg bg-zinc-800">
          <h1 className="w-full text-4xl text-start">Total:</h1>
          <h4 className="w-full text-xl text-start">Tasks</h4>
          <h1 className="text-5xl absolute -translate-y-0.5 text-blue-400 translate-x-7">
            {tasks?.length}
          </h1>
        </div>
      </div>
      <div className="flex justify-center col-start-2 row-start-5 row-span-3 col-span-4">
        <Graphics title="Projects" state={projects as []} />
      </div>
      <div className="flex justify-center col-start-6 row-start-5 row-span-3 col-span-4">
        <Graphics title="Tasks" state={tasks as []} />
      </div>
    </>
  );
};
