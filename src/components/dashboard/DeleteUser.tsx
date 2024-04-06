import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { SearchUsers } from '../SearchUsers';
import { type AuthRegister } from '../../types';

export const DeleteUser = (): JSX.Element => {
  const { deleteUser, state } = useAuth();
  const [dataUser, setDataUser] = useState<AuthRegister>();

  const dataRelived = (data: AuthRegister): void => {
    setDataUser(data);
  };

  const onDeleteUser = async (id: string): Promise<void> => {
    console.log(id);
    await deleteUser(id);
  };

  return (
    <>
      <div className="row-start-2 col-start-5 col-span-2">
        <SearchUsers placeholder="Search User" sendData={dataRelived} />
      </div>
      <h1 className="text-2xl col-start-5 col-span-2 text-center row-start-2 flex justify-center items-end font-semibold">
        INFO USER
      </h1>
      <div className="row-start-3 col-start-4 row-span-4 pt-10 rounded-2xl bg-zinc-800 p-5 col-span-4 hitespace-pre-wrap break-words whitespace-wrap">
        <h5>Name: {dataUser?.fullName}</h5>
        <h5>User: {dataUser?.user}</h5>
        <h5>Email: {dataUser?.email}</h5>
        <h5>Roles: {JSON.stringify(dataUser?.roles)}</h5>
        <h5 className="">
          Assigned Projects: {JSON.stringify(dataUser?.assignedProjects)}
        </h5>
        <h5>Assigned Tasks: {JSON.stringify(dataUser?.assignedTasks)}</h5>
      </div>
      <div className="row-start-7 col-start-5 col-span-2 flex justify-center items-end">
        <h1 className="text-blue-500">{state.delete?.message}</h1>
      </div>
      <div className="row-start-7 col-start-5 col-span-2 flex justify-center items-center">
        <button
          onClick={async () => {
            await onDeleteUser(dataUser?._id);
          }}
          className="bg-blue-500 rounded-2xl pl-5 pr-5 p-1"
        >
          DELETE USER
        </button>
      </div>
    </>
  );
};
