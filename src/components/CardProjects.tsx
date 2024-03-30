import { useEffect } from 'react';
import { useProject } from '../hooks/useProjects';
import { type ProjectApi } from '../types';
import { Link } from 'react-router-dom';

export const CardProjects = (): JSX.Element => {
  const { viewMoreProject, data, offset } = useProject();

  useEffect(() => {
    async function returnProjects(): Promise<void> {
      await viewMoreProject();
    }

    void returnProjects();
  }, [offset]);

  return (
    <div className="container">
      {data?.map((data: ProjectApi) => {
        return (
          <Link
            to={`/platform/project/${data._id}`}
            className="flex container w-full flex-col p-4 mt-5 bg-zinc-700 hover:bg-zinc-600 hover:transition-all shadow-2xl hover:-translate-y-1 rounded-2xl"
            key={data._id}
          >
            <h1 className="text-xl text-link">{data.name}</h1>
            <p className="mt-2 whitespace-nowrap overflow-hidden text-ellipsis max-w-64 md:max-w-4xl">
              {data.description}
            </p>
          </Link>
        );
      })}
    </div>
  );
};
