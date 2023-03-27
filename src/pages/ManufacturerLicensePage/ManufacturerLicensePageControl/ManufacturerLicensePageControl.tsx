import React from 'react';
import ManLicensesDateIntervalSelector from './ManLicensesDateIntervalSelector/ManLicensesDateIntervalSelector';
import BottomButtonReturnTo, { ReturnToEnum } from '../../../components/BottomButtonReturnTo/BottomButtonReturnTo';
import LicensesMonitor from '../../../components/commonComponents/LicensesMonitor/LicensesMonitor';
import LicensesStatistics from '../../../components/commonComponents/LicensesStatistics/LicensesStatistics';
import classes from './ManufacturerLicensePageControl.module.css';

const ManufacturerLicensePageControl: React.FC = () => {
  return (
    <div className={classes.container}>
      <ManLicensesDateIntervalSelector />
      <div className={classes.middleSpreadContainer}>
        <LicensesStatistics />
        <LicensesMonitor />
      </div>
      <div className={classes.bottomContainer}>
        <BottomButtonReturnTo returnTo={ReturnToEnum.catalog} />
      </div>
    </div>
  );
};

export default ManufacturerLicensePageControl;
