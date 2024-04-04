import { Link, useParams } from 'react-router-dom';
import { Navbar } from './Navbar';
import { useEffect } from 'react';
import { useReport } from '../hooks/useReport';
import { useProject } from '../hooks/useProjects';
import { CardReports } from './CardReports';

export const DetailsReport = (): JSX.Element => {
  const { reportId } = useParams();
  const {
    findOne: findOneReport,
    findLatest,
    state: stateReport,
  } = useReport();
  const { findOne: findOneProject, state: stateProject } = useProject();
  const { findOne: reportData } = stateReport;
  const { findOne: projectData } = stateProject;

  useEffect(() => {
    async function callFetchData(): Promise<void> {
      if (reportId) {
        await findOneReport(reportId);
        await findLatest();
      }
      if (reportData) {
        const projectId = reportData.projectId[0];
        await findOneProject(projectId);
      }
    }
    void callFetchData();
  }, [reportId]);

  return (
    <>
      <Navbar />
      <div className="mt-10 flex flex-col justify-center items-center m-auto max-w-4xl mb-10">
        <h1 className="w-full text-xl font-semibold">
          Report: {reportData?.title}
        </h1>
        <h4 className="w-full text-sm text-zinc-500">
          Of the project:{' '}
          <Link
            className="text-blue-500"
            to={`/platform/project/${projectData?._id}`}
          >
            {projectData?.name}
          </Link>
        </h4>
        <h4 className="w-full text-sm text-zinc-500">
          by: {reportData?.user.user}
        </h4>
        <div className="flex gap-10 mt-5">
          <div>
            <div className="border border-indigo-900 rounded-xl p-2">
              <h5 className="text-lg font-semibold mb-1">Report</h5>
              <p className="whitespace-pre-wrap break-words min-w-lg max-w-lg bg-zinc-800 p-3 rounded-md whitespace-wrap">
                {reportData?.description}
              </p>
            </div>
          </div>
          <div>
            <div className="flex items-center flex-col max-w-xs container bg-zinc-800 p-4 rounded-xl">
              <h1 className="w-full text-xl">Latest reports other projects</h1>
              <CardReports />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
