import React from 'react';
import classes from './DayItem.module.css';
import { LicenceAction, LicenseActionTypeEnum } from '../../../../../../types/types';
import { getLicenseAmount } from '../LicenseActionsListItem';

type PropsType = {
  date: Date;
  licensesActions: LicenceAction[];
  licenseActionType: LicenseActionTypeEnum;
};

const DayItem: React.FC<PropsType> = ({ date, licensesActions, licenseActionType }) => {
  const dayLicenseActions = licensesActions.filter(
    (licenseAction) => new Date(licenseAction.actionDate).getDate() === date.getDate()
  );

  const dayLicenseAmount = getLicenseAmount(licenseActionType, dayLicenseActions);

  return (
    <div className={classes.container}>
      <div className={classes.title}>{date.getDate()}</div>
      {dayLicenseAmount ? (
        <div className={classes.licenseAmount}>{dayLicenseAmount}</div>
      ) : (
        <div className={classes.noData}>{'-'} </div>
      )}
    </div>
  );
};

export default DayItem;
