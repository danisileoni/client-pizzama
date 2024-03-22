import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

export const ProtectedRoute = (): JSX.Element => {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) return <h1>Loading</h1>;
  if (!isLoading && !isAuthenticated) return <Navigate to="/login" />;

  return <Outlet />;
};
