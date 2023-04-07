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
import ResellerCabinetPage from '../../pages/ResellerCabinetPage/ResellerCabinetPage';
import ResellerReportPage from '../../pages/ResellerReportPage/ResellerReportPage';
import ResellerReportDetailsPage from '../../pages/ResellerReportDetailsPage/ResellerReportDetailsPage';
import ResellerCreateManufacturerPage from '../../pages/ResellerCreateManufacturerPage/ResellerCreateManufacturerPage';
import ManufacturerActivationPage from '../../pages/ManufacturerActivationPage/ManufacturerActivationPage';

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
  ResellerCabinetPage = '/reseller-cabinet',
  ResellerReportPage = '/reseller-report',
  ResellerReportDetailsPage = '/reseller-report-details',
  ResellerCreateManufacturerPage = '/reseller-create-manufacturer',
  ManufacturerActivationPage = '/manufacturer-activation',
}

const publicRoutes: RouteType[] = [
  { path: PageEnum.RootPage, element: <UnitedPage /> },
  { path: `${PageEnum.UserPricePage}/:mid`, element: <UserPricePage /> },
  { path: PageEnum.SuccessRegistrationPage, element: <SuccessRegistrationPage /> },
  { path: PageEnum.ManufacturerShowCasePage, element: <ManufacturerShowCasePage /> },
  { path: PageEnum.RulesPage, element: <RulesPage /> },
  { path: PageEnum.ContactsPage, element: <ContactsPage /> },
  { path: `${PageEnum.ManufacturerActivationPage}/:code`, element: <ManufacturerActivationPage /> },
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
  { path: PageEnum.ResellerCabinetPage, element: <ResellerCabinetPage /> },
  { path: PageEnum.ResellerReportPage, element: <ResellerReportPage /> },
  { path: PageEnum.ResellerReportDetailsPage, element: <ResellerReportDetailsPage /> },
  { path: PageEnum.ResellerCreateManufacturerPage, element: <ResellerCreateManufacturerPage /> },
];

export const getProtectedRoute = (incomeRoute: string) => {
  const firstPartIncomeRoute = incomeRoute.split('/')?.[1];
  if (firstPartIncomeRoute) {
    for (let i = 0; i < protectedRoutes.length; i++) {
      const route = protectedRoutes[i];
      const headForPath = route.path.split('/')?.[1];
      if (firstPartIncomeRoute === headForPath) {
        return incomeRoute;
      }
    }
  }
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
