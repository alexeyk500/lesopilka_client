import React from 'react';
import classes from './ManufacturerRegistrationPage.module.css';
import { useAppSelector } from '../../hooks/hooks';
import { selectorUser } from '../../store/userSlice';
import { CrumbType } from '../../types/types';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumps';
import { getManufacturerOrUserName } from '../UserPage/UserPage';
import ManufacturerRegistrationDetails from './ManufacturerRegistrationDetails/ManufacturerRegistrationDetails';
import { PageEnum } from '../../components/AppRouter/AppRouter';

const ManufacturerRegistrationPage: React.FC = () => {
  const user = useAppSelector(selectorUser);
  const crumbs: CrumbType[] = [
    { title: getManufacturerOrUserName(user), route: PageEnum.RootPage },
    { title: 'профиль пользователя', route: PageEnum.UserPage },
    { title: 'регистрация поставщика' },
  ];

  return (
    <div className={classes.container}>
      <BreadCrumbs crumbs={crumbs} />
      <ManufacturerRegistrationDetails />
    </div>
  );
};

export default ManufacturerRegistrationPage;
