import React from 'react';
import { ManufacturerType } from '../../../../../types/types';
import classes from './ResellerManufacturerListItem.module.css';
import { lastDigitToWord } from '../../../../../utils/dateTimeFunctions';
import ResellerManufacturerStatus from './ResellerManufacturerStatus/ResellerManufacturerStatus';

const getForecastDayAmount = (manufacturer: ManufacturerType) => {
  if (manufacturer.restLicenses && manufacturer.activeCards) {
    return Math.floor(manufacturer.restLicenses / manufacturer.activeCards);
  }
};

const getForecastTitle = (forecastDayAmount?: number) => {
  if (forecastDayAmount) {
    const dayAmountsLastWord = lastDigitToWord(forecastDayAmount, ['день', 'дня', 'дней']);
    return `на ${forecastDayAmount} ${dayAmountsLastWord}`;
  }
  return '-';
};

type PropsType = {
  manufacturer: ManufacturerType;
};

const ResellerManufacturerListItem: React.FC<PropsType> = ({ manufacturer }) => {
  const forecastDayAmount = getForecastDayAmount(manufacturer);
  const forecastTitle = getForecastTitle(forecastDayAmount);

  return (
    <div className={classes.container}>
      <div className={classes.tableColumnManufacturer}>{manufacturer.title}</div>
      <div className={classes.tableColumnLocation}>{manufacturer.address.location.title}</div>
      <div className={classes.tableColumnPublications}>{manufacturer.activeCards}</div>
      <div className={classes.tableColumnLicenses}>{manufacturer.restLicenses}</div>
      <div className={classes.tableColumnForecast}>{forecastTitle}</div>
      <div className={classes.tableColumnActions}>{'Действия'}</div>
      <div className={classes.tableColumnStatus}>
        {/*<ResellerManufacturerStatus forecastDayAmount={forecastDayAmount} isApproved={manufacturer.approved} />*/}
        {/*<ResellerManufacturerStatus forecastDayAmount={25} isApproved={false} />*/}
        {/*<ResellerManufacturerStatus forecastDayAmount={25} isApproved={true} />*/}
        {/*<ResellerManufacturerStatus forecastDayAmount={7} isApproved={true} />*/}
        <ResellerManufacturerStatus forecastDayAmount={-1} isApproved={true} />
      </div>
    </div>
  );
};

export default ResellerManufacturerListItem;
