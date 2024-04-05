import { useEffect, useRef, useState } from 'react';
import { IconSearch } from './icons/IconSearch';
import { type AuthRegister } from '../types';
import { useAuth } from '../hooks/useAuth';

type Props = {
  placeholder: string;
  sendData: (data: AuthRegister) => void;
};

export const SearchUsers = ({ placeholder, sendData }: Props): JSX.Element => {
  const { getAllUsers, state } = useAuth();
  const [searchFound, setSearchFound] = useState<AuthRegister[]>();
  const [value, setValue] = useState<string>('');
  const stateRef = useRef<AuthRegister[]>();

  useEffect(() => {
    stateRef.current = state.findAll;
  }, [state]);

  useEffect(() => {
    void getAllUsers();
  }, []);

  const Search = async (value: string): Promise<void> => {
    if (value === '') return;
    try {
      const searchData = stateRef.current
        ?.filter((object: AuthRegister) =>
          object.fullName.toLowerCase().includes(value),
        )
        .slice(0, 5);

      setSearchFound(searchData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnClick = (data: AuthRegister): void => {
    sendData(data);

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
      <IconSearch tCss="absolute z-10 inset-y-2 inset-x-2 w-5 h-5" />
      {value ? (
        <div
          className={`flex flex-col absolute ${searchFound?.length ? 'bg-1f1f1f' : ''} -translate-y-4 pt-4 w-full`}
          style={{ zIndex: 1 }}
        >
          {searchFound?.map((data) => (
            <button
              className="p-2 hover:bg-zinc-700 "
              key={data._id}
              onClick={() => {
                handleOnClick(data);
              }}
            >
              <h1 className="text-start">{data.fullName}</h1>
              <p className="text-start">Username: {data.user}</p>
              <p className="text-start">id: {data._id}</p>
            </button>
          ))}
        </div>
      ) : (
        <></>
      )}
    </form>
  );
};
