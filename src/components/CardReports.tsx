import { useEffect } from 'react';
import { useReport } from '../hooks/useReport';
import { type ProjectApi, type ReportsApi } from '../types';
import { Link } from 'react-router-dom';
import { useProject } from '../hooks/useProjects';

export const CardReports = (): JSX.Element => {
  const { findAll, state } = useReport();
  const { findAll: findAllProjects, state: stateProjects } = useProject();

  useEffect(() => {
    const returnReports = async (): Promise<void> => {
      await findAll();
      await findAllProjects();
    };
    void returnReports();
  }, []);

  return (
    <div className="container">
      {state.data?.map((data: ReportsApi) => {
        // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
        const project = stateProjects.data?.find(
          (project: ProjectApi) => project?._id === String(data.projectId),
        );
        const projectName = project
          ? (project as ProjectApi).name
          : 'Project Not Found';
        return (
          <Link
            key={data._id}
            to={''}
            className="flex flex-col p-3 mt-3 w-full bg-zinc-700 shadow-2xl hover:bg-zinc-600 hover:transition rounded-2xl hover:-translate-y-1"
          >
            <h1 className="text-link">{data.title}</h1>
            <h2 className="text-xs">{projectName}</h2>
            <p className="mt-2 text-xs whitespace-nowrap overflow-hidden text-ellipsis md:max-w-xs">
              {data.description}
            </p>
          </Link>
        );
      })}
    </div>
  );
};
