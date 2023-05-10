import { Outlet, Navigate } from 'react-router-dom';
import { IsAuthenticated } from '../types/auth';

const TodoRoute = ({ isAuthenticated }: IsAuthenticated) => {
  return isAuthenticated ? <Navigate to="/todo" replace /> : <Outlet />;
};

export default TodoRoute;
