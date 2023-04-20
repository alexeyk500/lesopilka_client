import React from 'react';
import classes from './ResellerReportPage.module.css';
import LeftColumn from '../../components/LeftColumn/LeftColumn';
import MainColumn from '../../components/MainColumn/MainColumn';
import ResellerReportPageControl from './ResellerReportPageControl/ResellerReportPageControl';
import ResellerReportPageMainPart from './ResellerReportPageMainPart/ResellerReportPageMainPart';

const ResellerReportPage: React.FC = () => {
  return (
    <div className={classes.container}>
      <LeftColumn title={`Отчет\nпо публикациям`}>
        <ResellerReportPageControl />
      </LeftColumn>
      <MainColumn noScroll>
        <ResellerReportPageMainPart />
      </MainColumn>
    </div>
  );
};

export default ResellerReportPage;
