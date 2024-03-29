import React, { useMemo } from 'react';
import classes from './LicenseActionsList.module.css';
import { LicenceAction, LicenseActionTypeEnum } from '../../../../types/types';
import { splitDatesArrayByMonth } from '../../../../utils/dateTimeFunctions';
import LicenseActionsListItem from './LicenseActionsListItem/LicenseActionsListItem';

type PropsType = {
  dates: Date[];
  licensesActions: LicenceAction[];
  licenseActionType: LicenseActionTypeEnum;
};

const LicenseActionsList: React.FC<PropsType> = ({ dates, licensesActions, licenseActionType }) => {
  const datesSplittedByMonth = useMemo(() => splitDatesArrayByMonth(dates), [dates]);
  return (
    <div className={classes.container}>
      <div className={classes.listContainer}>
        {datesSplittedByMonth?.map((monthDates, ind) => {
          return (
            <LicenseActionsListItem
              key={ind}
              monthDates={monthDates}
              licensesActions={licensesActions}
              licenseActionType={licenseActionType}
            />
          );
        })}
      </div>
    </div>
  );
};

export default LicenseActionsList;
