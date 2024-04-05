import { type ChangeEvent, useState } from 'react';
import { type ProjectApi, type AuthRegister, type TasksAPI } from '../../types';
import { SearchUsers } from '../SearchUsers';
import { IconTrash } from '../icons/IconTrash';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';
import { useTasks } from '../../hooks/useTasks';
import { Search } from '../Search';

export const CreateTask = (): JSX.Element => {
  const [dataTask, setDataTask] = useState<TasksAPI>({
    title: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    description: '',
    backOrFront: '',
    projectId: undefined,
    userId: undefined,
  });
  const [disabled, setDisabled] = useState(true);
  const [dataUser, setDataUser] = useState<AuthRegister>();
  const [dataProject, setDataProject] = useState<ProjectApi>();
  const { createTask } = useTasks();
  const today = new Date();

  console.log(dataTask);

  const onChangeDataTask = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    e.preventDefault();
    const { name, value } = e.target;

    setDataTask({
      ...dataTask,
      [name]: value,
    });
  };

  const dataRetrieved = (data: AuthRegister): void => {
    setDataUser(data);
    setDataTask({
      ...dataTask,
      userId: data._id,
    });
  };

  const dataRetrievedProject = (data: ProjectApi): void => {
    setDataProject(data);
    setDataTask({
      ...dataTask,
      projectId: data._id,
    });
  };

  const deleteUserData = (): void => {
    setDataUser(undefined);
    setDataTask({
      ...dataTask,
      userId: undefined,
    });
  };
  const deleteProjectData = (): void => {
    setDataProject(undefined);
    setDataTask({
      ...dataTask,
      projectId: undefined,
    });
  };

  const onDateChanges = (
    event: Date | null | undefined,
    changing: string,
  ): void => {
    setDataTask({
      ...dataTask,
      [changing]: event,
    });
  };

  const onButtonCreate = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): Promise<void> => {
    e.preventDefault();

    try {
      setDisabled(true);
      await createTask(dataTask);
      await Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'You have created the task successfully',
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1 className="flex row-start-1 col-start-5 font-semibold justify-center mb-8 items-center col-span-2 text-4xl">
        Create project
      </h1>
      <h1 className="row-start-1 col-start-2 col-span-2 text-xl font-semibold ml-8 mb-3 flex items-end">
        Info
      </h1>
      <div className="m-auto row-start-2 col-start-2 row-span-3 col-span-4">
        <form className="flex flex-col row-span-3 col-span-4">
          <input
            className={`bg-zinc-700 border p-1 rounded-md mb-5`}
            name="title"
            onChange={onChangeDataTask}
            value={dataTask.title}
            type="text"
            placeholder="Title"
          />
          <textarea
            className={`bg-zinc-700 border`}
            name="description"
            onChange={onChangeDataTask}
            cols={75}
            rows={20}
            placeholder="Description"
            value={dataTask.description}
          />
          <div className="flex justify-center">
            <button
              type="submit"
              onClick={onButtonCreate}
              disabled={
                !(
                  dataTask.title &&
                  dataTask.description &&
                  dataTask.startDate &&
                  dataTask.endDate &&
                  dataTask.userId &&
                  dataTask.projectId
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
      <div className="w-80 col-start-6 row-start-2 mt-14 row-span-2">
        {dataTask.userId ? (
          <div className="flex flex-col m-2 p-2 bg-zinc-700 rounded-2xl">
            <div className="relative">
              <button
                onClick={() => {
                  deleteUserData();
                }}
                className="absolute translate-x-60"
              >
                <IconTrash />
              </button>
            </div>
            <h1>{dataUser?.fullName}</h1>
            <p>{dataUser?.user}</p>
            <p>ID: {dataUser?._id}</p>
          </div>
        ) : null}
      </div>
      <div className="w-80 col-start-6 row-start-4">
        <Search placeholder="Search Project" sendData={dataRetrievedProject} />
      </div>
      <div className="w-80 col-start-6 row-start-4 mt-14 row-span-2">
        {dataTask.projectId ? (
          <div className="flex flex-col m-2 p-2 bg-zinc-700 rounded-2xl">
            <div className="relative">
              <button
                onClick={() => {
                  deleteProjectData();
                }}
                className="absolute translate-x-60"
              >
                <IconTrash />
              </button>
            </div>
            <h1>{dataProject?.name}</h1>
            <p>Users: {dataProject?.assignedUsers?.length}</p>
            <p>ID: {dataProject?._id}</p>
          </div>
        ) : null}
      </div>
      <div className="row-start-6 col-start-6">
        <form>
          <h1 className="text-xl font-bold">Type Task</h1>
          <input
            type="radio"
            onChange={onChangeDataTask}
            name="backOrFront"
            value="front"
          />{' '}
          Front <br />
          <input
            type="radio"
            onChange={onChangeDataTask}
            name="backOrFront"
            value="back"
          />{' '}
          Back
        </form>
      </div>
      <h1 className="row-start-1 col-start-8 flex items-end mb-2 text-xl font-semibold justify-center translate-x-5">
        Set Date
      </h1>
      <div className="row-start-2 col-start-8 flex flex-col w-full items-center col-span-2 row-span-7">
        <h1 className="text-xl">Start Project</h1>
        <DatePicker
          className="bg-zinc-800 p-2 rounded-md border"
          selected={dataTask.startDate as Date}
          onChange={(event) => {
            onDateChanges(event, 'startDate');
          }}
          minDate={today}
        />
        <h1 className="text-xl">End Project</h1>
        <DatePicker
          className="bg-zinc-800 p-2 rounded-md border"
          selected={dataTask.endDate as Date}
          onChange={(event) => {
            onDateChanges(event, 'endDate');
          }}
          minDate={dataTask.startDate as Date}
        />
      </div>
    </>
  );
};
