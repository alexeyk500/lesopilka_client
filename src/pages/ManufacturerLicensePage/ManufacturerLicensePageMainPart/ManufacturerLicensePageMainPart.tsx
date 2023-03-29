import React, { useEffect } from 'react';
import classes from './ManufacturerLicensePageMainPart.module.css';
import LicenseActionsList from './LicenseActionsList/LicenseActionsList';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import {
  getManufacturerLicensesActionsThunk,
  selectorManufacturerLicenseActionType,
  selectorManufacturerLicensesActions,
  selectorManufacturerLicensesDateFrom,
  selectorManufacturerLicensesDateTo,
} from '../../../store/manLicensesSlice';
import { getDatesBetweenDates, getOnlyDateInStr, normalizeDate } from '../../../utils/dateTimeFunctions';
import { LicenseActionTypeEnum } from '../../../types/types';

const getSectionTile = (licenseActionType: LicenseActionTypeEnum) => {
  if (licenseActionType === LicenseActionTypeEnum.redeem) {
    return 'Использование лицензий';
  } else {
    return 'Покупка лицензий';
  }
};

const ManufacturerLicensePageMainPart: React.FC = () => {
  const dispatch = useAppDispatch();
  const dateFromSelector = useAppSelector(selectorManufacturerLicensesDateFrom);
  const dateToSelector = useAppSelector(selectorManufacturerLicensesDateTo);
  const licensesActions = useAppSelector(selectorManufacturerLicensesActions);
  const licenseActionType = useAppSelector(selectorManufacturerLicenseActionType);

  const title = getSectionTile(licenseActionType);

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
      <div className={classes.title}>{title}</div>
      <div className={classes.scrollContainer}>
        <LicenseActionsList dates={dates} licensesActions={licensesActions} licenseActionType={licenseActionType} />
      </div>
    </div>
  );
};

export default ManufacturerLicensePageMainPart;
