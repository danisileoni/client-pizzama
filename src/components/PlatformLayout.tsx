import { useProject } from '../hooks/useProjects';
import { CardProjects } from './CardProjects';
import { CardReports } from './CardReports';

export const PlatformLayout = (): JSX.Element => {
  const { handleBtnForOffset, hasMore } = useProject();

  return (
    <div className="flex justify-center">
      <div className="flex flex-col md:flex-row justify-center p-10 md:min-w-full gap-6">
        <div>
          <section className="flex items-center w-full flex-col max-w-xs md:max-w-4xl container bg-zinc-800 p-5 rounded-s-xl">
            <h1 className="text-3xl w-full text-white">PROJECTS</h1>
            <CardProjects />
            {hasMore ? (
              <button
                className="mt-4 bg-indigo-600 p-1 w-40 rounded-md hover:bg-indigo-500 transition-all"
                onClick={handleBtnForOffset}
              >
                View More
              </button>
            ) : (
              ''
            )}
          </section>
        </div>
        <div>
          <section className="flex items-center w-full flex-col max-w-xs md:max-w-sm container bg-zinc-800 p-5 rounded-e-xl">
            <h1 className="text-3xl text-white w-full mb-2">Latest Reports</h1>
            <CardReports />
          </section>
        </div>
      </div>
    </div>
  );
};
