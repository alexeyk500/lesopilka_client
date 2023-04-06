import React from 'react';
import classes from './ResellerReportDetailsPage.module.css';
import LeftColumn from '../../components/LeftColumn/LeftColumn';
import MainColumn from '../../components/MainColumn/MainColumn';

const ResellerReportDetailsPage: React.FC = () => {
  return (
    <div className={classes.container}>
      <LeftColumn title={`Детализация\nпубликаций`}>Детализация публикаций</LeftColumn>
      <MainColumn noScroll>Список Поставщиков</MainColumn>
    </div>
  );
};

export default ResellerReportDetailsPage;
