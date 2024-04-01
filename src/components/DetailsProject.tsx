import { useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useProject } from '../hooks/useProjects';
import { Navbar } from './Navbar';
import { useAuth } from '../hooks/useAuth';
import { type ProjectManagmentReducer } from '../types';
import { useReport } from '../hooks/useReport';

export const DetailsProject = (): JSX.Element => {
  const { projectId } = useParams();
  const { findOne, state: stateProject } = useProject();
  const { getAllUsers, state: stateUser } = useAuth();
  const { findAll: findAllReports, state: stateReports } = useReport();
  const stateProjectRef = useRef<ProjectManagmentReducer>();
  const { findAll: users } = stateUser;

  useEffect(() => {
    async function resData(): Promise<void> {
      if (projectId) await findOne(projectId);
      await getAllUsers();
      await findAllReports();
    }
    void resData();
  }, [projectId]);

  useEffect(() => {
    stateProjectRef.current = stateProject;
  }, [stateProject]);

  return (
    <>
      <Navbar />
      <div className="mt-5 flex flex-col justify-center items-center m-auto max-w-4xl mb-10">
        <div className="w-full flex justify-between">
          <h1 className="text-4xl font-semibold mb-3">
            {stateProject.findOne?.name} <p className="text-lg">Project</p>
          </h1>
          <div className="flex items-center">
            {}
            <Link
              className="pr-3 pl-3 pt-1 pb-1 rounded-lg bg-blue-500 hover:bg-blue-700 shadow-xl hover:transition-all"
              to={''}
            >
              Add Report
            </Link>
          </div>
        </div>
        <div className="flex md:flex-row gap-3">
          <div className="flex-1">
            <div className=" border flex flex-col border-indigo-900 rounded-xl p-2 min-w-52 max-w-52">
              <h1 className="mb-1 text-lg font-semibold">Assigned Users</h1>
              {Array.isArray(users)
                ? users?.map((user) => {
                    if (
                      stateProjectRef.current?.findOne?.assignedUsers?.includes(
                        user._id,
                      )
                    ) {
                      return (
                        <div
                          className="flex mb-2 flex-col bg-zinc-700 p-2 rounded-xl shadow-xl"
                          key={user._id}
                        >
                          <h1>{user.fullName}</h1>
                          <p className="text-xs">{user.user}</p>
                        </div>
                      );
                    }
                    return null;
                  })
                : null}
            </div>
          </div>
          <div className="border border-indigo-900 rounded-xl p-2">
            <h1 className="text-lg font-semibold mb-1">Description</h1>
            <p className="max-w-lg bg-zinc-800 p-3 rounded-md">
              {stateProject.findOne?.description}
            </p>
          </div>
          <div className="flex-1">
            <div className="flex flex-col border border-indigo-900 rounded-xl p-2 min-w-52 max-w-52">
              <h1 className="text-lg font-semibold mb-1">
                Reports the project
              </h1>
              {stateReports.findAll?.map((report) => {
                if (
                  stateProjectRef.current?.findOne?.assignedReports?.includes(
                    report._id,
                  )
                ) {
                  return (
                    <Link
                      className="flex flex-col mb-2 bg-zinc-700 p-2 rounded-xl shadow-xl hover:bg-zinc-600 hover:transition-all"
                      to={`/platform/report/${report._id}`}
                      key={report._id}
                    >
                      <h1>{report.title}</h1>
                      <p className="text-xs text-sky-600">
                        {report.user.fullName}
                      </p>
                    </Link>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
