import { BrowserRouter, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import MainPage from './pages/MainPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import Layout from './pages/Layout';
import NotFound from './pages/NotFound';

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
          <Route path="/" element={<Navigate to="/todo" replace={true} />} />
          <Route path="/signin" element={isAuthenticated ? <Navigate to="/todo" replace={true} /> : <SignInPage />} />
          <Route path="/signup" element={isAuthenticated ? <Navigate to="/todo" replace={true} /> : <SignUpPage />} />
          <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/todo" element={<MainPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
