import { Outlet, Navigate } from 'react-router-dom';
import { IsAuthenticated } from '../types/auth';

const SigninRoute = ({ isAuthenticated }: IsAuthenticated) => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default SigninRoute;
