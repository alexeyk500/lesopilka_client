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
import RedirectPageWithLogin from '../../pages/RedirectPageWithLogin/RedirectPageWithLogin';
import ManufacturerLicensePage from '../../pages/ManufacturerLicensePage/ManufacturerLicensePage';
import FavoriteProductsPage from '../../pages/FavoriteProductsPage/FavoriteProductsPage';
import ManufacturerShowCasePage from '../../pages/ManufacturerShowCasePage/ManufacturerShowCasePage';
import UserPricePage from '../../pages/UserPricePage/UserPricePage';
import RulesPage from '../../pages/RulesPage/RulesPage';
import ContactsPage from '../../pages/ContactsPage/ContactsPage';
import ResellerRegistrationPage from '../../pages/ResellerRegistrationPage/ResellerRegistrationPage';

type RouteType = {
  path: string;
  element: JSX.Element;
};

export enum PageEnum {
  RootPage = '/',
  UserPricePage = '/user-price-page',
  SuccessRegistrationPage = '/success-registration',
  RedirectPageWithLogin = '/redirect-with-login',
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
  FavoriteProductPage = '/favorite-product',
  ManufacturerShowCasePage = '/showcase',
  AddToBasketPage = '/add-to-basket',
  RulesPage = '/rules',
  ContactsPage = '/contacts',
  ResellerRegistration = '/reseller-registration',
}

const publicRoutes: RouteType[] = [
  { path: PageEnum.RootPage, element: <UnitedPage /> },
  { path: `${PageEnum.UserPricePage}/:mid`, element: <UserPricePage /> },
  { path: PageEnum.SuccessRegistrationPage, element: <SuccessRegistrationPage /> },
  { path: PageEnum.ManufacturerShowCasePage, element: <ManufacturerShowCasePage /> },
  { path: PageEnum.RulesPage, element: <RulesPage /> },
  { path: PageEnum.ContactsPage, element: <ContactsPage /> },
];

const protectedRoutes: RouteType[] = [
  { path: PageEnum.UserPage, element: <UserPage /> },
  { path: PageEnum.ManufacturerPage, element: <UnitedPage /> },
  { path: PageEnum.ManufacturerPricePage, element: <PricePage /> },
  { path: PageEnum.BasketPage, element: <BasketPage /> },
  { path: `${PageEnum.EditProduct}/:id`, element: <EditCardPage /> },
  { path: PageEnum.ManufacturerRegistration, element: <ManufacturerRegistrationPage /> },
  { path: PageEnum.ResellerRegistration, element: <ResellerRegistrationPage /> },
  { path: `${PageEnum.NewOrder}/:mid`, element: <NewOrderPage /> },
  { path: PageEnum.UserOrdersPage, element: <UserOrdersPage /> },
  { path: PageEnum.ManufacturerOrdersPage, element: <ManufacturerOrdersPage /> },
  { path: PageEnum.UserOrderItemPage, element: <OrderItemPage /> },
  { path: PageEnum.ManufacturerOrderItemPage, element: <OrderItemPage isManufacturerOrder /> },
  { path: PageEnum.ManufacturerLicensesPage, element: <ManufacturerLicensePage /> },
  { path: PageEnum.FavoriteProductPage, element: <FavoriteProductsPage /> },
  { path: PageEnum.AddToBasketPage, element: <ManufacturerShowCasePage isAddToBasketPage /> },
];

export const getProtectedRoute = (incomeRoute: string) => {
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
        {isAuth ? (
          protectedRoutes.map((route, ind) => <Route key={ind} path={route.path} element={route.element} />)
        ) : (
          <Route key={'redirectWithLogin'} path={PageEnum.RedirectPageWithLogin} element={<RedirectPageWithLogin />} />
        )}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default AppRouter;
