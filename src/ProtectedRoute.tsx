import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

type Props = {
  roles: string;
};

export const ProtectedRoute = ({ roles }: Props): JSX.Element => {
  const { state } = useAuth();

  if (state.loading) return <h1>Loading</h1>;
  if (!state.loading && !state.authenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};
