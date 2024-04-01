import { useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { useProject } from '../hooks/useProjects';
import { Link } from 'react-router-dom';

export const ProjectsPage = (): JSX.Element => {
  const { findForUser, state } = useProject();
  const { findForUser: userProjects } = state;

  useEffect(() => {
    void (async () => {
      await findForUser();
    })();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-col max-w-6xl mt-5 m-auto mb-10">
        <h1 className="text-2xl font-semibold">Your Projects</h1>
        <div>
          {userProjects?.map((project) => {
            return (
              <Link
                className="bg-zinc-800 flex rounded-xl flex-col hover:-translate-y-1 hover:transition-all hover:bg-zinc-700 p-5 mt-3 shadow-xl"
                to={`/platform/project/${project.slug}`}
                key={project._id}
              >
                <h1 className="text-lg font-semibold mb-2">{project.name}</h1>
                <p className="text-xs whitespace-nowrap overflow-hidden text-ellipsis">
                  {project.description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};
