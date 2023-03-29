import React from 'react';
import classes from './LicensesStatistics.module.css';
import ButtonsSection from '../ButtonsSection/ButtonsSection';
import { getDatesBetweenDates, normalizeDate } from '../../../utils/dateTimeFunctions';
import { useAppSelector } from '../../../hooks/hooks';
import {
  selectorManufacturerLicensesActions,
  selectorManufacturerLicensesDateFrom,
  selectorManufacturerLicensesDateTo,
} from '../../../store/manLicensesSlice';

const LicensesStatistics: React.FC = () => {
  const dateFrom = normalizeDate(useAppSelector(selectorManufacturerLicensesDateFrom));
  const dateTo = normalizeDate(useAppSelector(selectorManufacturerLicensesDateTo));
  const licensesActions = useAppSelector(selectorManufacturerLicensesActions);

  const dates = getDatesBetweenDates(dateFrom, dateTo);

  const daysAmount = dates.length;
  const licenseRedeemAmount = licensesActions.reduce(
    (acc, licenseAction) => acc + licenseAction?.redeemLicenseAmount!,
    0
  );
  const licensePurchaseAmount = licensesActions.reduce(
    (acc, licenseAction) => acc + licenseAction?.purchaseLicenseAmount!,
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
          <span className={classes.title}>Лицензий куплено</span>-
          <span className={classes.amount}>&nbsp;&nbsp;{licensePurchaseAmount}</span>
        </div>
        <div className={classes.rowContainer}>
          <span className={classes.title}>Лицензий использовано</span>-
          <span className={classes.amount}>&nbsp;&nbsp;{licenseRedeemAmount}</span>
        </div>
      </div>
    </ButtonsSection>
  );
};

export default LicensesStatistics;
