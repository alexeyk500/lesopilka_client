import React from 'react';
import classes from './ResellerDetailReportPage.module.css';
import LeftColumn from '../../components/LeftColumn/LeftColumn';
import MainColumn from '../../components/MainColumn/MainColumn';
import ResellerDetailReportControl from './ResellerDetailReportControl/ResellerDetailReportControl';
import ResellerDetailReportMain from './ResellerDetailReportMain/ResellerDetailReportMain';

const ResellerDetailReportPage: React.FC = () => {
  return (
    <div className={classes.container}>
      <LeftColumn title={`Детализация по\nдате публикаций`}>
        <ResellerDetailReportControl />
      </LeftColumn>
      <MainColumn noScroll>
        <ResellerDetailReportMain />
      </MainColumn>
    </div>
  );
};

export default ResellerDetailReportPage;
