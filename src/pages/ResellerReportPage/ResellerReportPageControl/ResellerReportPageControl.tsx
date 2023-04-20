import React from 'react';
import ResellerReportDateIntervalSelector from './ResellerReportDateIntervalSelector/ResellerReportDateIntervalSelector';
import classes from '../../ManufacturerLicensePage/ManufacturerLicensePageControl/ManufacturerLicensePageControl.module.css';
import BottomButtonReturnTo, { ReturnToEnum } from '../../../components/BottomButtonReturnTo/BottomButtonReturnTo';
import ResellerReportStatistics from './ResellerReportStatistics/ResellerReportStatistics';

const ResellerReportPageControl: React.FC = () => {
  return (
    <div className={classes.container}>
      <ResellerReportDateIntervalSelector />
      <div className={classes.middleSpreadContainer}>
        <ResellerReportStatistics />
      </div>
      <div className={classes.bottomContainer}>
        <BottomButtonReturnTo returnTo={ReturnToEnum.mainPage} />
      </div>
    </div>
  );
};

export default ResellerReportPageControl;
