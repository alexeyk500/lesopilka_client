import React from 'react';
import classes from './LicenseActionsListItem.module.css';
import DayItem from './DayItem/DayItem';
import {
  formatUTCtoMMMMYYYY,
  lastDigitToDayWord,
  lastDigitToLicenseWord,
} from '../../../../../utils/dateTimeFunctions';
import { LicenceAction } from '../../../../../types/types';

type PropsType = {
  monthDates: Date[];
  licensesActions: LicenceAction[];
};

const LicenseActionsListItem: React.FC<PropsType> = ({ monthDates, licensesActions }) => {
  const title = formatUTCtoMMMMYYYY(monthDates[0]?.toISOString());
  const monthDaysAmount = monthDates.length;
  const monthLicensesActions = licensesActions.filter(
    (licenseAction) => new Date(licenseAction.actionDate).getMonth() === monthDates[0]?.getMonth()
  );
  const monthLicenseAmount = monthLicensesActions.reduce(
    (acc, licenseAction) => acc + licenseAction?.redeemLicenseAmount!,
    0
  );

  return (
    <div className={classes.container}>
      <div className={classes.title}>{title}</div>
      <div className={classes.listContainer}>
        {monthDates?.map((date, ind) => {
          return <DayItem key={ind} date={date} licensesActions={monthLicensesActions} />;
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
