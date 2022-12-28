import React from 'react';
import classes from './NewOrderPage.module.css';
import LeftColumn from '../../components/LeftColumn/LeftColumn';
import MainColumn from '../../components/MainColumn/MainColumn';
import NewOrderPageControl from './NewOrderPageControl/NewOrderPageControl';
import NewOrderPageMainPart from './NewOrderPageMainPart/NewOrderPageMainPart';

const NewOrderPage = () => {
  return (
    <div className={classes.container}>
      <LeftColumn title={`Оформление заказа`}>
        <NewOrderPageControl />
      </LeftColumn>
      <MainColumn>
        <NewOrderPageMainPart />
      </MainColumn>
    </div>
  );
};

export default NewOrderPage;
