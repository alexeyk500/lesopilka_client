import React from 'react';
import classes from './ManufacturerRegistrationPage.module.css';
import { useAppSelector } from '../../hooks/hooks';
import { selectorUser } from '../../store/userSlice';
import { CrumbType } from '../../types/types';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumps';
import { getUserName } from '../UserPage/UserPage';
import ManufacturerRegistrationDetails from './ManufacturerRegistrationDetails/ManufacturerRegistrationDetails';

const ManufacturerRegistrationPage: React.FC = () => {
  const user = useAppSelector(selectorUser);
  const crumbs: CrumbType[] = [
    { title: getUserName(user), route: '/' },
    { title: 'профиль пользователя' },
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
