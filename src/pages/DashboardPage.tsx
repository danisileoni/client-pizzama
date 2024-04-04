import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
export const DashboardPage = (): JSX.Element => {
  const { state, getActive } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    void (async () => {
      await getActive();
    })();
  }, []);

  useEffect(() => {
    if (state.activeData) {
      if (!state.activeData.roles.includes('admin')) {
        navigate(-1);
      }
    }
  });

  return <div>DashboardPage</div>;
};
