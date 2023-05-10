import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import MainPage from './pages/MainPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import Layout from './pages/Layout';
import NotFound from './pages/NotFound';
import { useState } from 'react';
import SigninRoute from './router/SignInRoute';
import TodoRoute from './router/TodoRoute';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('access_token'));

  const updateIsAuthenticated = () => {
    setIsAuthenticated(localStorage.getItem('access_token'));
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/todo" replace={true} />} />
          <Route element={<TodoRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/signin" element={<SignInPage updateIsAuthenticated={updateIsAuthenticated} />} />
          </Route>
          <Route element={<TodoRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/signup" element={<SignUpPage />} />
          </Route>
          <Route element={<SigninRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/todo" element={<MainPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
