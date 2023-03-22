import React from 'react';
import classes from '../NewOrderPage/NewOrderPage.module.css';
import LeftColumn from '../../components/LeftColumn/LeftColumn';
import MainColumn from '../../components/MainColumn/MainColumn';
import UserOrdersPageControl from './UserOrdersPageControl/UserOrdersPageControl';
import UserOrdersPageMain from './UserOrdersPageMain/UserOrdersPageMain';

const UserOrdersPage: React.FC = () => {
  return (
    <div className={classes.container}>
      <LeftColumn title={`Заказы поставщикам`}>
        <UserOrdersPageControl />
      </LeftColumn>
      <MainColumn noScroll>
        <UserOrdersPageMain />
      </MainColumn>
    </div>
  );
};

export default UserOrdersPage;
