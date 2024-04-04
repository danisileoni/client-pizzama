import { type ProjectApi, type TasksAPI } from '../../types';
import { Graphics } from '../Graphics';

type Props = {
  projects: ProjectApi[];
  tasks: TasksAPI[];
};

export const Dashboard = ({ projects, tasks }: Props): JSX.Element => {
  return (
    <>
      <h1 className="flex justify-center items-center col-start-5 col-span-2 text-4xl">
        DASHBOARD
      </h1>
      <div className="col-start-4 row-start-2 flex flex-col p-4 justify-center items-center border border-blue-400 w-96 translate-x-2 rounded-lg bg-zinc-800">
        <h1 className="w-full text-4xl text-start">Total:</h1>
        <h4 className="w-full text-xl text-start">Projects</h4>
        <h1 className="text-5xl absolute -translate-y-0.5 text-blue-400 translate-x-7">
          {projects?.length}
        </h1>
      </div>
      <div className="col-start-7 translate-x-2 row-start-2 flex flex-col p-4 just justify-center items-center border border-blue-400 w-96 rounded-lg bg-zinc-800">
        <h1 className="w-full text-4xl text-start">Total:</h1>
        <h4 className="w-full text-xl text-start">Tasks</h4>
        <h1 className="text-5xl absolute -translate-y-0.5 text-blue-400 translate-x-7">
          {tasks?.length}
        </h1>
      </div>
      <div className="flex justify-center col-start-3 row-start-4 row-span-2 col-span-3">
        <Graphics title="Projects" state={projects as []} />
      </div>
      <div className="flex justify-center col-start-6 row-start-4 row-span-2 col-span-3">
        <Graphics title="Tasks" state={tasks as []} />
      </div>
    </>
  );
};
