import React, { useEffect } from 'react';
import classes from './Header.module.css';
import LoginButton from './LoginButton/LoginButton';
import MenuButton from './MenuButton/MenuButton';
import { userLoginByTokenThunk } from '../../store/userSlice';
import { useAppDispatch } from '../../hooks/hooks';
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

const Header: React.FC = () => {
  const dispatch = useAppDispatch();

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
        <FavoriteButton />
        <BasketButton />
        <LoginButton />
      </div>
    </div>
  );
};

export default Header;
