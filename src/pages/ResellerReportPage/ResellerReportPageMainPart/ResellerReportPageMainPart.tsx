import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { getDatesBetweenDates, getOnlyDateInStr, normalizeDate } from '../../../utils/dateTimeFunctions';
import classes from './ResellerReportPageMainPart.module.css';
import LicenseActionsList from '../../ManufacturerLicensePage/ManufacturerLicensePageMainPart/LicenseActionsList/LicenseActionsList';
import {
  getResellerManufacturersLicenseActionsThunk,
  selectorResellerManufacturersLicenseActions,
  selectorResellerReportDateFrom,
  selectorResellerReportDateTo,
} from '../../../store/resellerSlice';
import { LicenseActionTypeEnum } from '../../../types/types';

const ResellerReportPageMainPart: React.FC = () => {
  const dispatch = useAppDispatch();
  const dateFromSelector = useAppSelector(selectorResellerReportDateFrom);
  const dateToSelector = useAppSelector(selectorResellerReportDateTo);
  const licenseActions = useAppSelector(selectorResellerManufacturersLicenseActions);

  const dates = getDatesBetweenDates(normalizeDate(dateFromSelector), normalizeDate(dateToSelector));

  useEffect(() => {
    const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
    const dateFrom = getOnlyDateInStr(dateFromSelector);
    const dateTo = getOnlyDateInStr(dateToSelector);
    if (token && dateTo && dateFrom) {
      dispatch(getResellerManufacturersLicenseActionsThunk({ dateFrom, dateTo, token }));
    }
  }, [dateFromSelector, dateToSelector, dispatch]);

  return (
    <div className={classes.container}>
      <div className={classes.title}>{'Использование лицензий поставщиками'}</div>
      <div className={classes.scrollContainer}>
        <LicenseActionsList
          dates={dates}
          licensesActions={licenseActions}
          licenseActionType={LicenseActionTypeEnum.redeem}
        />
      </div>
    </div>
  );
};

export default ResellerReportPageMainPart;
