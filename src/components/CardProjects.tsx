import { useEffect } from 'react';
import { useProject } from '../hooks/useProjects';
import { type ProjectApi } from '../types';

export const CardProjects = (): JSX.Element => {
  const { findAll, state } = useProject();

  useEffect(() => {
    async function hola(): Promise<void> {
      await findAll();
    }

    void hola();
  }, []);
  console.log(state.data);

  return (
    <div>
      {state.data?.map((data: ProjectApi) => {
        return (
          <button
            className="flex flex-col p-5 mt-5 bg-zinc-700 shadow-2xl hover:bg-zinc-600 hover:transition rounded-2xl"
            key={data._id}
          >
            <h1 className="text-xl">{data.name}</h1>
            <p className="mt-2 whitespace-nowrap overflow-hidden text-ellipsis max-w-4xl">
              {data.description}
            </p>
          </button>
        );
      })}
    </div>
  );
};
