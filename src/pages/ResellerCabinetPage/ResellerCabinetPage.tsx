import React from 'react';
import classes from './ResellerCabinetPage.module.css';
import LeftColumn from '../../components/LeftColumn/LeftColumn';
import MainColumn from '../../components/MainColumn/MainColumn';

const ResellerCabinetPage: React.FC = () => {
  return (
    <div className={classes.container}>
      <LeftColumn title={`Кабинет реселлера`}>Кабинет реселлера</LeftColumn>
      <MainColumn noScroll>Список Поставщиков</MainColumn>
    </div>
  );
};

export default ResellerCabinetPage;
