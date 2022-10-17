import React, { useEffect } from 'react';
import classes from './UserPage.module.css';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumps';
import UserDetails from './UserDetails/UserDetails';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { selectorUser } from '../../store/userSlice';
import { CrumbType, UserType } from '../../types/types';
import { getRegionsThunk } from '../../store/addressSlice';

export const getUserName = (user: UserType | undefined) => {
  if (user) {
    if (user.manufacturer?.title) {
      return user.manufacturer.title;
    }
    if (user.name) {
      return user.name;
    }
  }
  return '';
};

const UserPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectorUser);
  const crumbs: CrumbType[] = [{ title: getUserName(user), route: '/' }, { title: 'профиль пользователя' }];

  useEffect(() => {
    dispatch(getRegionsThunk());
  }, [dispatch]);

  return (
    <div className={classes.container}>
      <BreadCrumbs crumbs={crumbs} />
      <UserDetails />
    </div>
  );
};

export default UserPage;
