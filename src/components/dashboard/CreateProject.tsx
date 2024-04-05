import { type ChangeEvent, useState } from 'react';
import { type ProjectApi, type AuthRegister } from '../../types';
import { SearchUsers } from '../SearchUsers';
import { IconTrash } from '../icons/IconTrash';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { useProject } from '../../hooks/useProjects';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';

export const CreateProject = (): JSX.Element => {
  const [dataProject, setDataProject] = useState<ProjectApi>({
    name: '',
    startDate: new Date(),
    endDate: '',
    description: '',
    assignedUsers: [],
  });
  const [disabled, setDisabled] = useState(true);
  const [dataUser, setDataUser] = useState<AuthRegister[]>([]);
  const { createProject } = useProject();
  const today = new Date();

  const onChangeDataProject = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    e.preventDefault();
    const { name, value } = e.target;

    setDataProject({
      ...dataProject,
      [name]: value,
    });
  };

  const dataRetrieved = (data: AuthRegister): void => {
    if (!dataUser.some((user) => user._id === data._id)) {
      setDataUser((prevData) => [...prevData, data]);
      setDataProject((prevData) => ({
        ...prevData,
        assignedUsers: [...(prevData.assignedUsers ?? []), data._id],
      }));
    }
  };

  const deleteUserData = (idDelete: string): void => {
    setDataUser((prevData) => prevData.filter((user) => user._id !== idDelete));
    setDataProject((prevData) => ({
      ...prevData,
      assignedUsers: prevData.assignedUsers?.filter((id) => id !== idDelete),
    }));
  };

  const onDateChanges = (
    event: Date | null | undefined,
    changing: string,
  ): void => {
    setDataProject({
      ...dataProject,
      [changing]: event,
    });
  };

  const onButtonCreate = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): Promise<void> => {
    e.preventDefault();

    try {
      setDisabled(true);
      await createProject(dataProject);
      await Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'You have created the project successfully',
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1 className="row-start-1 col-start-2 col-span-2 text-xl font-semibold ml-8 mb-3 flex items-end">
        Info
      </h1>
      <div className="m-auto row-start-2 col-start-2 row-span-3 col-span-4">
        <form className="flex flex-col row-span-3 col-span-4">
          <input
            className={`bg-zinc-700 border p-1 rounded-md mb-5`}
            name="name"
            onChange={onChangeDataProject}
            value={dataProject.name}
            type="text"
            placeholder="Title"
          />
          <textarea
            className={`bg-zinc-700 border`}
            name="description"
            onChange={onChangeDataProject}
            cols={75}
            rows={20}
            placeholder="Description"
            value={dataProject.description}
          />
          <div className="flex justify-center">
            <button
              type="submit"
              onClick={onButtonCreate}
              disabled={
                !(
                  dataProject.name &&
                  dataProject.description &&
                  dataProject.startDate &&
                  dataProject.endDate &&
                  dataProject.assignedUsers?.length !== 0
                ) && disabled
              }
              className="bg-blue-500 pl-20 pr-20 mt-3 pb-1 pt-1 flex justify-center rounded-xl hover:bg-blue-600 transition-all"
            >
              Create Project
            </button>
          </div>
        </form>
      </div>
      <h1 className="row-start-1 col-start-6 text-xl font-semibold mb-3 flex items-end">
        User Assigned
      </h1>
      <div className="w-80 col-start-6 row-start-2">
        <SearchUsers placeholder="Search Users" sendData={dataRetrieved} />
      </div>
      <div className="w-80 md:min-h-[30rem] bg-zinc-800 col-start-6 row-start-2 mt-14 row-span-4 overflow-y-auto">
        {dataUser.map((data) => (
          <div
            className="flex flex-col m-2 p-2 bg-zinc-700 rounded-2xl"
            key={data._id}
          >
            <div className="relative">
              <button
                onClick={() => {
                  deleteUserData(data._id);
                }}
                className="absolute translate-x-60"
              >
                <IconTrash />
              </button>
            </div>
            <h1>{data.fullName}</h1>
            <p>{data.user}</p>
            <p>ID: {data._id}</p>
          </div>
        ))}
      </div>
      <h1 className="row-start-1 col-start-8 flex items-end mb-2 text-xl font-semibold justify-center translate-x-5">
        Set Date1
      </h1>
      <div className="row-start-2 col-start-8 flex flex-col w-full items-center col-span-2 row-span-7">
        <h1 className="text-xl">Start Project</h1>
        <DatePicker
          className="bg-zinc-800 p-2 rounded-md border"
          selected={dataProject.startDate as Date}
          onChange={(event) => {
            onDateChanges(event, 'startDate');
          }}
          minDate={today}
        />
        <h1 className="text-xl">End Project</h1>
        <DatePicker
          className="bg-zinc-800 p-2 rounded-md border"
          selected={dataProject.endDate as Date}
          onChange={(event) => {
            onDateChanges(event, 'endDate');
          }}
          minDate={dataProject.startDate as Date}
        />
      </div>
    </>
  );
};
