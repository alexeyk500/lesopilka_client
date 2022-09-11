import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import MainPage from '../../pages/MainPage/MainPage';
import UserPage from '../../pages/UserPage/UserPage';
import SuccessRegistrationPage from '../../pages/SuccessRegistrationPage/SuccessRegistrationPage';

type RouteType = {
  path: string;
  element: JSX.Element;
};

const publicRoutes: RouteType[] = [
  { path: '/', element: <MainPage /> },
  { path: '/success_registration', element: <SuccessRegistrationPage /> },
];

const protectedRoutes: RouteType[] = [{ path: '/user', element: <UserPage /> }];

const AppRouter = () => {
  const isAuth = true;

  return (
    <>
      <Routes>
        {publicRoutes.map((route, ind) => (
          <Route key={ind} path={route.path} element={route.element} />
        ))}
        {isAuth && protectedRoutes.map((route, ind) => <Route key={ind} path={route.path} element={route.element} />)}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default AppRouter;
