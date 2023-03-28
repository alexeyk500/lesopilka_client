import React from 'react';
import classes from './DayItem.module.css';
import { LicenceAction } from '../../../../../../types/types';

type PropsType = {
  date?: Date;
  licensesActions: LicenceAction[];
};

const DayItem: React.FC<PropsType> = ({ date, licensesActions }) => {
  const dayLicenseAmount = licensesActions.find(
    (licenseAction) => new Date(licenseAction.actionDate).getDate() === date?.getDate()
  );
  return (
    <div className={classes.container}>
      <div className={classes.title}>{date?.getDate()}</div>
      {dayLicenseAmount?.redeemLicenseAmount ? (
        <div className={classes.licenseAmount}>{dayLicenseAmount.redeemLicenseAmount}</div>
      ) : (
        <div className={classes.noData}>{'н/д'} </div>
      )}
    </div>
  );
};

export default DayItem;
