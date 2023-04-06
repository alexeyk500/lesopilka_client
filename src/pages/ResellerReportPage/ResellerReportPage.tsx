import React from 'react';
import classes from './ResellerReportPage.module.css';
import LeftColumn from '../../components/LeftColumn/LeftColumn';
import MainColumn from '../../components/MainColumn/MainColumn';

const ResellerReportPage: React.FC = () => {
  return (
    <div className={classes.container}>
      <LeftColumn title={`Отчет\nпо публикациям`}>Отчет реселлера по публикациям</LeftColumn>
      <MainColumn noScroll>Список публикацияй</MainColumn>
    </div>
  );
};

export default ResellerReportPage;
