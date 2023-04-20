import React from 'react';
import { getDatesBetweenDates } from '../../../../utils/dateTimeFunctions';
import { useAppSelector } from '../../../../hooks/hooks';
import ButtonsSection from '../../../../components/commonComponents/ButtonsSection/ButtonsSection';
import classes from '../../../../components/commonComponents/LicensesStatistics/LicensesStatistics.module.css';
import {
  selectorResellerManufacturersLicenseActions,
  selectorResellerReportDateFrom,
  selectorResellerReportDateTo,
} from '../../../../store/resellerSlice';

const ResellerReportStatistics: React.FC = () => {
  const dateFrom = new Date(useAppSelector(selectorResellerReportDateFrom));
  const dateTo = new Date(useAppSelector(selectorResellerReportDateTo));
  const licenseActions = useAppSelector(selectorResellerManufacturersLicenseActions);

  const dates = getDatesBetweenDates(dateFrom, dateTo);

  const daysAmount = dates.length;
  const licenseRedeemAmount = licenseActions.reduce(
    (acc, licenseAction) => acc + licenseAction?.redeemLicenseAmount!,
    0
  );

  return (
    <ButtonsSection title={'Статистика за период'}>
      <div className={classes.infoContainer}>
        <div className={classes.rowContainer}>
          <span className={classes.title}>Кол-во дней в периоде</span>-
          <span className={classes.amount}>&nbsp;&nbsp;{daysAmount}</span>
        </div>
        <div className={classes.rowContainer}>
          <span className={classes.title}>Лицензий использовано</span>-
          <span className={classes.amount}>&nbsp;&nbsp;{licenseRedeemAmount}</span>
        </div>
      </div>
    </ButtonsSection>
  );
};

export default ResellerReportStatistics;
