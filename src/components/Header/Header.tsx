import React, { useEffect, useRef } from 'react';
import classes from './Header.module.css';
import LoginButton from './LoginButton/LoginButton';
import MenuButton from './MenuButton/MenuButton';
import { selectorIsUserChecked, selectorUser, userLoginByTokenThunk } from '../../store/userSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import BasketButton from './BasketButton/BasketButton';
import FavoriteButton from './FavoriteButton/FavoriteButton';
import Logo from './Logo/Logo';
import Search from './Search/Search';
import {
  getCategoriesThunk,
  getCategorySizesThunk,
  getProductMaterialsThunk,
  getProductSortsThunk,
  getSubCategoriesThunk,
} from '../../store/catalogSlice';
import SearchLocationSelector from '../commonComponents/SearchLocationSelector/SearchLocationSelector';
import CatalogButton from './CatalogButton/CatalogButton';
import OrdersButton from './OrdersButton/OrdersButton';
import { useNavigate } from 'react-router-dom';
import { getProtectedRoute, PageEnum } from '../AppRouter/AppRouter';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();

  const isAuth = !!useAppSelector(selectorUser);
  const isUserChecked = useAppSelector(selectorIsUserChecked);
  const navigate = useNavigate();

  const incomeRouteRef = useRef<string | undefined>(undefined);
  const redirectRouteRef = useRef<string | undefined>(undefined);

  if (incomeRouteRef.current === undefined) {
    const redirectRoute = getProtectedRoute(window.location.pathname);
    if (redirectRoute) {
      incomeRouteRef.current = `${redirectRoute}${window.location.search ? window.location.search : ''}`;
      redirectRouteRef.current = `${redirectRoute}${window.location.search ? window.location.search : ''}`;
    } else {
      incomeRouteRef.current = `${window.location.pathname}${window.location.search ? window.location.search : ''}`;
    }
  }

  useEffect(() => {
    if (!isAuth && isUserChecked && redirectRouteRef.current) {
      navigate(`${PageEnum.RedirectPageWithLogin}?redirect=${redirectRouteRef.current}`);
      redirectRouteRef.current = undefined;
    } else if (isAuth && isUserChecked && redirectRouteRef.current) {
      navigate(redirectRouteRef.current);
      redirectRouteRef.current = undefined;
    }
  }, [isAuth, isUserChecked, navigate]);

  useEffect(() => {
    dispatch(userLoginByTokenThunk());
    dispatch(getCategoriesThunk());
    dispatch(getSubCategoriesThunk());
    dispatch(getProductMaterialsThunk());
    dispatch(getProductSortsThunk());
    dispatch(getCategorySizesThunk());
  }, [dispatch]);

  return (
    <div className={classes.container}>
      <div className={classes.headerContent}>
        <MenuButton />
        <Logo />
        <SearchLocationSelector />
        <Search />
        <CatalogButton />
        <BasketButton />
        <OrdersButton />
        <FavoriteButton />
        <LoginButton />
      </div>
    </div>
  );
};

export default Header;
