import React, { useEffect } from 'react';
import classes from './Header.module.css';
import LoginButton from './LoginButton/LoginButton';
import MenuButton from './MenuButton/MenuButton';
import { userLoginByTokenThunk } from '../../store/userSlice';
import { useAppDispatch } from '../../hooks/hooks';
import CartButton from './CartButton/CartButton';
import SelectedButton from './SelectedButton/SelectedButton';
import PlaceSelector from './PlaceSelector/PlaceSelector';
import Logo from './Logo/Logo';
import Search from './Search/Search';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(userLoginByTokenThunk());
  }, [dispatch]);

  return (
    <div className={classes.container}>
      <div className={classes.headerContent}>
        <MenuButton />
        <Logo />
        <PlaceSelector />
        <Search />
        <SelectedButton />
        <CartButton />
        <LoginButton />
      </div>

    </div>
  );
};

export default Header;
