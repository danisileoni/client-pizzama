import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';

export const ConfigUser = (): JSX.Element => {
  const { userId } = useParams();
  const { getOneUser, state } = useAuth();

  useEffect(() => {
    void (async () => {
      if (userId) {
        await getOneUser(userId);
      }
    })();
  }, [userId]);

  return (
    <>
      <div>
        <Link className="text-4xl font-semibold" to="/platform">
          Pizzama
        </Link>
      </div>
      <div>

      </div>
    </>
  );
};
