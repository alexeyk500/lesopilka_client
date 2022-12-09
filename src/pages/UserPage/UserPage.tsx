import React from 'react';
import classes from './UserPage.module.css';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumps';
import UserDetails from './UserDetails/UserDetails';
import { useAppSelector } from '../../hooks/hooks';
import { selectorUser } from '../../store/userSlice';
import { CrumbType, UserType } from '../../types/types';
import { PageEnum } from '../../components/AppRouter/AppRouter';

export const getManufacturerOrUserName = (user: UserType | undefined) => {
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
  const user = useAppSelector(selectorUser);
  const crumbs: CrumbType[] = [
    { title: getManufacturerOrUserName(user), route: PageEnum.RootPage },
    { title: 'профиль пользователя' },
  ];

  return (
    <div className={classes.container}>
      <BreadCrumbs crumbs={crumbs} />
      <UserDetails />
    </div>
  );
};

export default UserPage;
