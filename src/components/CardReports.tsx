import { useEffect } from 'react';
import { useReport } from '../hooks/useReport';
import { type ReportsApi } from '../types';
import { Link } from 'react-router-dom';

export const CardReports = (): JSX.Element => {
  const { findAll, state } = useReport();

  useEffect(() => {
    const returnReports = async (): Promise<void> => {
      await findAll();
    };
    void returnReports();
  }, []);

  return (
    <div>
      {state.data?.map((data: ReportsApi) => {
        return (
          <Link
            to={''}
            className="flex flex-col p-4 mt-3 bg-zinc-700 shadow-2xl hover:bg-zinc-600 hover:transition rounded-2xl"
            key={data._id}
          >
            <h1 className="text-sm text-link">{data.title}</h1>
            <p className="mt-2 text-xs whitespace-nowrap overflow-hidden text-ellipsis max-w-72">
              {data.description}
            </p>
          </Link>
        );
      })}
    </div>
  );
};
