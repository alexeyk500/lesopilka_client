import React from 'react';
import classes from './ManOrdersPage.module.css';
import LeftColumn from '../../components/LeftColumn/LeftColumn';
import ManufacturerOrdersPageControl from './ManOrdersPageControl/ManufacturerOrdersPageControl';
import MainColumn from '../../components/MainColumn/MainColumn';
import ManOrdersPageMain from './ManOrdersPageMain/ManOrdersPageMain';
import { CrumbType } from '../../types/types';
import { useAppSelector } from '../../hooks/hooks';
import { selectorUser } from '../../store/userSlice';
import { getManufacturerOrResellerOrUserName } from '../UserPage/UserPage';

const ManufacturerOrdersPage: React.FC = () => {
  const user = useAppSelector(selectorUser);
  const crumbs: CrumbType[] = [
    { title: getManufacturerOrResellerOrUserName(user) },
    { title: 'Заказы от покупателей' },
  ];

  return (
    <div className={classes.container}>
      <LeftColumn title={`Заказы от покупателей`}>
        <ManufacturerOrdersPageControl />
      </LeftColumn>
      <MainColumn noScroll crumbs={crumbs}>
        <ManOrdersPageMain />
      </MainColumn>
    </div>
  );
};

export default ManufacturerOrdersPage;
