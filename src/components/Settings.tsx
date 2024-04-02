import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';

export const Settings = (): JSX.Element => {
  const { getActive, state } = useAuth();
  const { activeData } = state;

  useEffect(() => {
    void (async () => {
      await getActive();
    })();
  }, []);

  return (
    <div className="bg-zinc-700 absolute min-w-32 -left-[4rem] flex flex-col rounded-lg">
      <Link
        className="hover:bg-zinc-800 pl-2 pr-4 p-1 flex flex-row items-center"
        to={''}
      >
        Config of user
      </Link>
      {activeData?.roles.includes('admin') ? (
        <Link className="hover:bg-zinc-800 p-1 pl-2 pr-4" to={''}>
          Dashboard
        </Link>
      ) : (
        ''
      )}
      <button className="bg-indigo-700 hover:bg-indigo-800 p-[2px]">
        Logout
      </button>
    </div>
  );
};
