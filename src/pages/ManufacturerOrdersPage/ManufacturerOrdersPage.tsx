import React from 'react';
import classes from './ManOrdersPage.module.css';
import LeftColumn from '../../components/LeftColumn/LeftColumn';
import ManufacturerOrdersPageControl from './ManOrdersPageControl/ManufacturerOrdersPageControl';
import MainColumn from '../../components/MainColumn/MainColumn';
import UserOrdersPageMain from './ManOrdersPageMain/UserOrdersPageMain';

const ManufacturerOrdersPage: React.FC = () => {
  return (
    <div className={classes.container}>
      <LeftColumn title={`Заказы от покупателей`}>
        <ManufacturerOrdersPageControl />
      </LeftColumn>
      <MainColumn noScroll>
        <UserOrdersPageMain />
      </MainColumn>
    </div>
  );
};

export default ManufacturerOrdersPage;
