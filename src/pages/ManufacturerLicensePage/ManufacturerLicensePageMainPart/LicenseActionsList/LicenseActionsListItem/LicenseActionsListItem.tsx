import React from 'react';
import classes from './LicenseActionsListItem.module.css';
import DayItem from './DayItem/DayItem';
import {
  formatUTCtoMMMMYYYY,
  lastDigitToDayWord,
  lastDigitToLicenseWord,
} from '../../../../../utils/dateTimeFunctions';
import { LicenceAction, LicenseActionTypeEnum } from '../../../../../types/types';

export const getLicenseAmount = (licenseActionType: LicenseActionTypeEnum, licensesActions: LicenceAction[]) => {
  if (licenseActionType === LicenseActionTypeEnum.redeem) {
    return licensesActions.reduce((acc, licenseAction) => acc + licenseAction?.redeemLicenseAmount!, 0);
  } else {
    return licensesActions.reduce((acc, licenseAction) => acc + licenseAction?.purchaseLicenseAmount!, 0);
  }
};

type PropsType = {
  monthDates: Date[];
  licensesActions: LicenceAction[];
  licenseActionType: LicenseActionTypeEnum;
};

const LicenseActionsListItem: React.FC<PropsType> = ({ monthDates, licensesActions, licenseActionType }) => {
  const title = formatUTCtoMMMMYYYY(monthDates[0]?.toISOString());
  const monthDaysAmount = monthDates.length;
  const monthLicensesActions = licensesActions.filter(
    (licenseAction) => new Date(licenseAction.actionDate).getMonth() === monthDates[0]?.getMonth()
  );
  const monthLicenseAmount = getLicenseAmount(licenseActionType, monthLicensesActions);

  return (
    <div className={classes.container}>
      <div className={classes.title}>{title}</div>
      <div className={classes.listContainer}>
        {monthDates?.map((date, ind) => {
          return (
            <DayItem
              key={ind}
              date={date}
              licensesActions={monthLicensesActions}
              licenseActionType={licenseActionType}
            />
          );
        })}
      </div>
      <div className={classes.infoRow}>
        {`${monthDaysAmount} ${lastDigitToDayWord(monthDaysAmount)} / ${monthLicenseAmount} ${lastDigitToLicenseWord(
          monthLicenseAmount
        )}`}
      </div>
    </div>
  );
};

export default LicenseActionsListItem;
