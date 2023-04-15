import { BrowserRouter, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import MainPage from './pages/MainPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import Layout from './pages/Layout';

interface PrivateRouteProps {
  isAuthenticated: string | null;
}

const PrivateRoute = ({ isAuthenticated }: PrivateRouteProps) => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" replace />;
};

const App = () => {
  const isAuthenticated = localStorage.getItem('access_token');

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/todo" replace />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/todo" element={<MainPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
