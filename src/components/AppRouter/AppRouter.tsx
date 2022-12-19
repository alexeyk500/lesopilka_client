import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import UserPage from '../../pages/UserPage/UserPage';
import SuccessRegistrationPage from '../../pages/SuccessRegistrationPage/SuccessRegistrationPage';
import EditCardPage from '../../pages/EditCardPage/EditCardPage';
import ManufacturerRegistrationPage from '../../pages/ManufacturerRegistrationPage/ManufacturerRegistrationPage';
import UnitedPage from '../../pages/UnitedPage/UnitedPage';
import PricePage from '../../pages/PricePage/PricePage';
import BasketPage from "../../pages/BasketPage/BasketPage";

type RouteType = {
  path: string;
  element: JSX.Element;
};

export enum PageEnum {
  RootPage = '/',
  UserPage = '/user',
  SuccessRegistrationPage = '/success_registration',
  PricePage = '/manufacturer_price_page',
  BasketPage = '/basket_page',
  ManufacturerPage = '/manufacturer',
  EditProduct = '/edit_product',
  ManufacturerRegistration = '/manufacturer_registration',
}

const publicRoutes: RouteType[] = [
  { path: PageEnum.RootPage, element: <UnitedPage /> },
  { path: PageEnum.SuccessRegistrationPage, element: <SuccessRegistrationPage /> },
];

const protectedRoutes: RouteType[] = [
  { path: PageEnum.UserPage, element: <UserPage /> },
  { path: PageEnum.ManufacturerPage, element: <UnitedPage /> },
  { path: PageEnum.PricePage, element: <PricePage /> },
  { path: PageEnum.BasketPage, element: <BasketPage /> },
  { path: `${PageEnum.EditProduct}/:id`, element: <EditCardPage /> },
  { path: PageEnum.ManufacturerRegistration, element: <ManufacturerRegistrationPage /> },
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
