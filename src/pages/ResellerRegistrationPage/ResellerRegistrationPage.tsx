import React from 'react';
import { useAppSelector } from '../../hooks/hooks';
import { selectorUser } from '../../store/userSlice';
import { CrumbType } from '../../types/types';
import { getManufacturerOrUserName } from '../UserPage/UserPage';
import { PageEnum } from '../../components/AppRouter/AppRouter';
import classes from './ResellerRegistrationPage.module.css';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumps';
import ResellerRegistrationDetails from './ResellerRegistrationDetails/ResellerRegistrationDetails';

const ResellerRegistrationPage: React.FC = () => {
  const user = useAppSelector(selectorUser);
  const crumbs: CrumbType[] = [
    { title: getManufacturerOrUserName(user) },
    { title: 'профиль пользователя', route: PageEnum.UserPage },
    { title: 'регистрация реселлера' },
  ];

  return (
    <div className={classes.container}>
      <BreadCrumbs crumbs={crumbs} />
      <ResellerRegistrationDetails />
    </div>
  );
};

export default ResellerRegistrationPage;
