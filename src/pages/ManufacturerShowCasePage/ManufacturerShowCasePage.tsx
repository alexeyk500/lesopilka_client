import React from 'react';
import classes from '../ManufacturerOrdersPage/ManOrdersPage.module.css';
import LeftColumn from '../../components/LeftColumn/LeftColumn';
import ManufacturerShowCaseControl from './ManufacturerShowCaseControl/ManufacturerShowCaseControl';
import ManufacturerShowCaseMainPart from './ManufacturerShowCaseMainPart/ManufacturerShowCaseMainPart';

type PropsType = {
  isAddToBasketPage?: boolean;
};

const ManufacturerShowCasePage: React.FC<PropsType> = ({ isAddToBasketPage }) => {
  return (
    <div className={classes.container}>
      <LeftColumn title={isAddToBasketPage ? `Добавление\nтоваров к заказу` : `Витрина\n(товары в продаже)`} hasScroll>
        <ManufacturerShowCaseControl isAddToBasketPage={isAddToBasketPage} />
      </LeftColumn>
      <ManufacturerShowCaseMainPart />
    </div>
  );
};

export default ManufacturerShowCasePage;
