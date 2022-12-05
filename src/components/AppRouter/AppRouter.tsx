import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import UserPage from '../../pages/UserPage/UserPage';
import SuccessRegistrationPage from '../../pages/SuccessRegistrationPage/SuccessRegistrationPage';
import EditCardPage from '../../pages/EditCardPage/EditCardPage';
import ManufacturerRegistrationPage from '../../pages/ManufacturerRegistrationPage/ManufacturerRegistrationPage';
import UnitedPage from '../../pages/UnitedPage/UnitedPage';

type RouteType = {
  path: string;
  element: JSX.Element;
};

const publicRoutes: RouteType[] = [
  { path: '/', element: <UnitedPage /> },
  { path: '/success_registration', element: <SuccessRegistrationPage /> },
];

const protectedRoutes: RouteType[] = [
  { path: '/user', element: <UserPage /> },
  { path: '/manufacturer', element: <UnitedPage /> },
  { path: '/edit_product/:id', element: <EditCardPage /> },
  { path: '/manufacturer_registration', element: <ManufacturerRegistrationPage /> },
];

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
