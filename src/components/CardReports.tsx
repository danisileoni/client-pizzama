import { useEffect } from 'react';
import { useReport } from '../hooks/useReport';
import { type ProjectApi, type ReportsApi } from '../types';
import { Link } from 'react-router-dom';
import { useProject } from '../hooks/useProjects';

export const CardReports = (): JSX.Element => {
  const { findLatest, state } = useReport();
  const { findAll: findAllProjects, state: stateProjects } = useProject();

  useEffect(() => {
    const returnReports = async (): Promise<void> => {
      await findLatest();
      await findAllProjects();
    };
    void returnReports();
  }, []);

  return (
    <div className="container">
      {state.findLatest?.map((data: ReportsApi) => {
        const project = stateProjects.findAll?.find(
          (project: ProjectApi) => project?._id === String(data?.projectId),
        );
        const projectName = project ? project.name : 'Project Not Found';
        return (
          <Link
            key={data?._id}
            to={`/platform/report/${data._id}`}
            className="flex flex-col p-3 mt-3 w-full bg-zinc-700 shadow-2xl hover:bg-zinc-600 hover:transition rounded-2xl hover:-translate-y-1"
          >
            <h1 className="text-link">{data?.title}</h1>
            <h2 className="text-xs">{projectName}</h2>
            <p className="mt-2 text-xs whitespace-nowrap overflow-hidden text-ellipsis md:max-w-xs">
              {data?.description}
            </p>
          </Link>
        );
      })}
    </div>
  );
};
