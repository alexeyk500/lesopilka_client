import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import UserPage from '../../pages/UserPage/UserPage';
import SuccessRegistrationPage from '../../pages/SuccessRegistrationPage/SuccessRegistrationPage';
import EditCardPage from '../../pages/EditCardPage/EditCardPage';
import ManufacturerRegistrationPage from '../../pages/ManufacturerRegistrationPage/ManufacturerRegistrationPage';
import UnitedPage from '../../pages/UnitedPage/UnitedPage';
import PricePage from '../../pages/PricePage/PricePage';
import BasketPage from '../../pages/BasketPage/BasketPage';
import NewOrderPage from '../../pages/NewOrderPage/NewOrderPage';
import UserOrdersPage from '../../pages/UserOrdersPage/UserOrdersPage';
import ManufacturerOrdersPage from '../../pages/ManufacturerOrdersPage/ManufacturerOrdersPage';
import OrderItemPage from '../../pages/OrderItemPage/OrderItemPage';
import { useAppSelector } from '../../hooks/hooks';
import { selectorUser } from '../../store/userSlice';
import LoginPage from '../../pages/LoginPage/LoginPage';
import ManufacturerLicensePage from '../../pages/ManufacturerLicensePage/ManufacturerLicensePage';

type RouteType = {
  path: string;
  element: JSX.Element;
};

export enum PageEnum {
  RootPage = '/',
  UserPricePage = '/user-price-page',
  SuccessRegistrationPage = '/success-registration',
  LoginPage = '/login',
  UserPage = '/user',
  ManufacturerPricePage = '/manufacturer-price-page',
  BasketPage = '/basket-page',
  ManufacturerPage = '/manufacturer',
  EditProduct = '/edit-product',
  ManufacturerRegistration = '/manufacturer-registration',
  NewOrder = '/new-order',
  UserOrdersPage = '/orders',
  ManufacturerOrdersPage = '/manufacturer-orders',
  UserOrderItemPage = '/order-item/:orderIdStr',
  ManufacturerOrderItemPage = '/manufacturer-order-item/:orderIdStr',
  ManufacturerLicensesPage = '/licenses',
}

const publicRoutes: RouteType[] = [
  { path: PageEnum.RootPage, element: <UnitedPage /> },
  { path: `${PageEnum.UserPricePage}/:mid`, element: <PricePage /> },
  { path: PageEnum.SuccessRegistrationPage, element: <SuccessRegistrationPage /> },
  { path: PageEnum.LoginPage, element: <LoginPage /> },
];

const protectedRoutes: RouteType[] = [
  { path: PageEnum.UserPage, element: <UserPage /> },
  { path: PageEnum.ManufacturerPage, element: <UnitedPage /> },
  { path: PageEnum.ManufacturerPricePage, element: <PricePage /> },
  { path: PageEnum.BasketPage, element: <BasketPage /> },
  { path: `${PageEnum.EditProduct}/:id`, element: <EditCardPage /> },
  { path: PageEnum.ManufacturerRegistration, element: <ManufacturerRegistrationPage /> },
  { path: `${PageEnum.NewOrder}/:mid`, element: <NewOrderPage /> },
  { path: PageEnum.UserOrdersPage, element: <UserOrdersPage /> },
  { path: PageEnum.ManufacturerOrdersPage, element: <ManufacturerOrdersPage /> },
  { path: PageEnum.UserOrderItemPage, element: <OrderItemPage /> },
  { path: PageEnum.ManufacturerOrderItemPage, element: <OrderItemPage isManufacturerOrder /> },
  { path: PageEnum.ManufacturerLicensesPage, element: <ManufacturerLicensePage /> },
];

export const isProtectedRoute = (incomeRoute: string) => {
  for (let i = 0; i < protectedRoutes.length; i++) {
    const route = protectedRoutes[i];
    const headForPath = route.path.split('/')?.[1];
    if (incomeRoute.includes(headForPath)) {
      return incomeRoute;
    }
  }
  return undefined;
};

const AppRouter = () => {
  const isAuth = !!useAppSelector(selectorUser);

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
