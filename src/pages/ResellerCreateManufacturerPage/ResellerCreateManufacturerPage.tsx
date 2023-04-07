import React from 'react';
import ManufacturerRegistrationData from '../ManufacturerRegistrationPage/ManufacturerRegistrationDetails/ManufacturerRegistrationData/ManufacturerRegistrationData';
import classes from './ResellerCreateManufacturerPage.module.css';
import { CrumbType } from '../../types/types';
import { getManufacturerOrUserName } from '../UserPage/UserPage';
import { PageEnum } from '../../components/AppRouter/AppRouter';
import { useAppSelector } from '../../hooks/hooks';
import { selectorUser } from '../../store/userSlice';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumps';

const ResellerCreateManufacturerPage: React.FC = () => {
  const user = useAppSelector(selectorUser);
  const crumbs: CrumbType[] = [
    { title: getManufacturerOrUserName(user) },
    { title: 'кабинет реселлера', route: PageEnum.ResellerCabinetPage },
    { title: 'регистрация поставщика' },
  ];

  return (
    <div className={classes.container}>
      <BreadCrumbs crumbs={crumbs} />
      <ManufacturerRegistrationData isFromReseller />
    </div>
  );
};

export default ResellerCreateManufacturerPage;
