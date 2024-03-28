import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useProject } from '../hooks/useProjects';
import { Navbar } from './Navbar';
import { useAuth } from '../hooks/useAuth';
import { type DataManagmentReducer } from '../types';

export const DetailsProject = (): JSX.Element => {
  const { projectId } = useParams();
  const { findOne, state: stateProject } = useProject();
  const { getAllUsers, user: users } = useAuth();
  const stateProjectRef = useRef<DataManagmentReducer>();

  useEffect(() => {
    async function resData(): Promise<void> {
      if (projectId) await findOne(projectId);
      await getAllUsers();
    }
    void resData();
  }, [projectId]);

  useEffect(() => {
    stateProjectRef.current = stateProject;
  }, [stateProject]);

  return (
    <>
      <Navbar />
      <div>
        <h1>{stateProject.findOne?.name}</h1>
        <p>{stateProject.findOne?.description}</p>
        <div>
          <h1>Users assigned to the project</h1>
          {Array.isArray(users)
            ? users?.map((user) => {
                if (
                  stateProjectRef.current?.findOne?.assignedUsers?.includes(
                    user._id,
                  )
                ) {
                  return (
                    <div key={user._id}>
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
    </>
  );
};
