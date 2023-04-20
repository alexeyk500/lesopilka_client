import React from 'react';
import classes from './DayItem.module.css';
import { LicenceAction, LicenseActionTypeEnum } from '../../../../../../types/types';
import { getLicenseAmount } from '../LicenseActionsListItem';

type PropsType = {
  date: Date;
  licensesActions: LicenceAction[];
  licenseActionType: LicenseActionTypeEnum;
  onItemClick?: (date: Date) => void;
};

const DayItem: React.FC<PropsType> = ({ date, licensesActions, licenseActionType, onItemClick }) => {
  const dayLicenseActions = licensesActions.filter(
    (licenseAction) => new Date(licenseAction.actionDate).getDate() === date.getDate()
  );

  const dayLicenseAmount = getLicenseAmount(licenseActionType, dayLicenseActions);

  const onClick = () => {
    onItemClick && onItemClick(date);
  };

  return (
    <div className={classes.container} onClick={onClick}>
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
