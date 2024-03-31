import { useEffect, useRef, useState } from 'react';
import { IconSearch } from './icons/IconSearch';
import { useProject } from '../hooks/useProjects';
import { type ProjectApi } from '../types';
import { Link } from 'react-router-dom';

type Props = {
  placeholder: string;
};

export const Search = ({ placeholder }: Props): JSX.Element => {
  const { findAll, state } = useProject();
  const [searchFound, setSearchFound] = useState<ProjectApi[]>();
  const [value, setValue] = useState<string>('');
  const stateRef = useRef<ProjectApi[]>();

  useEffect(() => {
    stateRef.current = state.findAll;
  }, [state]);

  useEffect(() => {
    void findAll();
  }, []);

  const Search = async (value: string): Promise<void> => {
    if (value === '') return;
    try {
      const searchData = stateRef.current
        ?.filter((object: ProjectApi) =>
          object.name.toLowerCase().includes(value),
        )
        .slice(0, 5);

      setSearchFound(searchData);
    } catch (error) {
      console.log(error);
    }
  };

  const restartSearch = (): void => {
    setSearchFound([]);
    setValue('');
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const { value } = e.target;

    setValue(value);

    void Search(value);
  };

  return (
    <form className="relative">
      <input
        type="text"
        className="focus:outline-none relative bg-1f1f1f p-1.5 pr-3 pl-8 rounded-full  min-w-80"
        placeholder={placeholder}
        value={value}
        onChange={handleOnChange}
        style={{ zIndex: 2 }}
      />
      <IconSearch tCss="absolute z-10 inset-y-2 inset-x-2 text-pholder w-5 h-5" />
      {value ? (
        <div
          className={`flex flex-col absolute ${searchFound?.length ? 'bg-1f1f1f' : ''} -translate-y-4 pt-4 w-full`}
          style={{ zIndex: 1 }}
        >
          {searchFound?.map((data) => (
            <Link
              className="p-2 hover:bg-zinc-700 "
              key={data._id}
              to={`/platform/project/${data.slug}`}
              onClick={restartSearch}
            >
              <h1>{data.name}</h1>
              <p>Reports: {data.assignedReports.length}</p>
            </Link>
          ))}
        </div>
      ) : (
        <></>
      )}
    </form>
  );
};
