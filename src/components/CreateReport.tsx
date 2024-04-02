import { Link, useNavigate, useParams } from 'react-router-dom';
import { Navbar } from './Navbar';
import { useProject } from '../hooks/useProjects';
import { useEffect, useState } from 'react';
import { useReport } from '../hooks/useReport';

export const CreateReport = (): JSX.Element => {
  const { projectId } = useParams();
  const { findOne, state: stateProject } = useProject();
  const [data, setData] = useState({
    title: '',
    description: '',
  });
  const [disabled, setDisabled] = useState(false);
  const { createReport } = useReport();
  const [error, setError] = useState({
    title: false,
    description: false,
  });
  const navigate = useNavigate();
  const { findOne: project } = stateProject;

  useEffect(() => {
    void (async () => {
      if (projectId) {
        await findOne(projectId);
      }
    })();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    e.preventDefault();
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setError({
      title: false,
      description: false,
    });

    if (
      data.title === '' ||
      data.description === '' ||
      data.description.length > 2000 ||
      data.title.length > 50
    ) {
      setError({
        title: data.title === '' || data.title.length > 50,
        description: data.description === '' || data.description.length > 2000,
      });

      return;
    }

    if (project?._id) {
      setDisabled(true);
      void createReport(data, project?._id);
      navigate(`/platform/project/${projectId}`);
    }
  };

  return (
    <>
      <Navbar />
      <div className="m-auto flex flex-col md:max-w-5xl">
        <h1 className="mt-5 text-2xl font-semibold mb-3">
          Add report to:{' '}
          <Link
            to={`/platform/project/${project?.slug}`}
            className="text-blue-500"
          >
            {project?.name}
          </Link>
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            className={`bg-zinc-700 border ${error.title ? 'border-rose-500' : ''}  p-1 rounded-md flex md: w-72`}
            name="title"
            value={data.title}
            onChange={handleChange}
            type="text"
            placeholder="Title"
          />
          <span className={`${data.title.length > 50 ? 'text-rose-500' : ''}`}>
            {data.title.length}/50
          </span>
          <textarea
            className={`bg-zinc-700 border ${error.description ? 'border-rose-500' : ''} rounded-md p-2 resize-none`}
            name="description"
            value={data.description}
            onChange={handleChange}
            cols={30}
            rows={10}
            placeholder="Description"
          />
          <span
            className={`text-end ${data.description.length > 2000 ? 'text-rose-500' : ''}`}
          >
            {data.description.length}/2000
          </span>
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={disabled}
              className="bg-blue-500 pl-20 pr-20 pb-1 pt-1 flex justify-center rounded-xl"
            >
              Create Report
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
