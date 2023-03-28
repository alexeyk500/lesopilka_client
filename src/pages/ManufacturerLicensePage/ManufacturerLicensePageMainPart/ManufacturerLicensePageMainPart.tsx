import React, { useEffect } from 'react';
import classes from './ManufacturerLicensePageMainPart.module.css';
import LicenseActionsList from './LicenseActionsList/LicenseActionsList';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import {
  getManufacturerLicensesActionsThunk,
  selectorManufacturerLicensesActions,
  selectorManufacturerLicensesDateFrom,
  selectorManufacturerLicensesDateTo,
} from '../../../store/manLicensesSlice';
import { getDatesBetweenDates, getOnlyDateInStr, normalizeDate } from '../../../utils/dateTimeFunctions';

const ManufacturerLicensePageMainPart: React.FC = () => {
  const dispatch = useAppDispatch();
  const dateFromSelector = useAppSelector(selectorManufacturerLicensesDateFrom);
  const dateToSelector = useAppSelector(selectorManufacturerLicensesDateTo);
  const licensesActions = useAppSelector(selectorManufacturerLicensesActions);

  const dates = getDatesBetweenDates(normalizeDate(dateFromSelector), normalizeDate(dateToSelector));

  useEffect(() => {
    const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
    const dateFrom = getOnlyDateInStr(dateFromSelector);
    const dateTo = getOnlyDateInStr(dateToSelector);
    if (token && dateTo && dateFrom) {
      dispatch(getManufacturerLicensesActionsThunk({ dateFrom, dateTo, token }));
    }
  }, [dateFromSelector, dateToSelector, dispatch]);

  return (
    <div className={classes.container}>
      <div className={classes.title}>{'Использование лицензий'}</div>
      <div className={classes.scrollContainer}>
        <LicenseActionsList dates={dates} licensesActions={licensesActions} />
      </div>
    </div>
  );
};

export default ManufacturerLicensePageMainPart;
