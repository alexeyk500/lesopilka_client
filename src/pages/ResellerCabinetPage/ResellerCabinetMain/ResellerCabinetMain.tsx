import React, { useEffect, useState } from 'react';
import classes from './ResellerCabinetMain.module.css';
import ResellerManufacturersList from './ResellerManufacturersList/ResellerManufacturersList';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import {
  getResellerManufacturersThunk,
  selectorResellerLicensesStatusOptionsId,
  selectorResellerManufacturers,
} from '../../../store/resellerSlice';
import { ManufacturerType } from '../../../types/types';
import { RESELLER_MANUFACTURER_STATUS_ATTENTION_DAYS } from '../../../utils/constants';
import { getForecastDayAmount } from './ResellerManufacturersList/ResellerManufacturerListItem/ResellerManufacturerListItem';

const getFilteredResellerManufacturers = (
  licensesStatusOptionsId: number,
  resellerManufacturers: ManufacturerType[]
) => {
  if (licensesStatusOptionsId === 0) {
    return resellerManufacturers;
  } else if (licensesStatusOptionsId === 1) {
    return resellerManufacturers.filter((manufacturer) => {
      const forecastDayAmount = getForecastDayAmount(manufacturer);
      if (forecastDayAmount) {
        return forecastDayAmount > RESELLER_MANUFACTURER_STATUS_ATTENTION_DAYS && manufacturer.approved;
      }
      return false;
    });
  } else if (licensesStatusOptionsId === 2) {
    return resellerManufacturers.filter((manufacturer) => {
      const forecastDayAmount = getForecastDayAmount(manufacturer);
      if (forecastDayAmount) {
        return forecastDayAmount <= RESELLER_MANUFACTURER_STATUS_ATTENTION_DAYS && manufacturer.approved;
      }
      return false;
    });
  } else if (licensesStatusOptionsId === 3) {
    return resellerManufacturers.filter((manufacturer) => {
      const forecastDayAmount = getForecastDayAmount(manufacturer);
      return !forecastDayAmount;
    });
  } else if (licensesStatusOptionsId === 4) {
    return resellerManufacturers.filter((manufacturer) => {
      return !manufacturer.approved;
    });
  }
};

const ResellerCabinetMain: React.FC = () => {
  const dispatch = useAppDispatch();
  const resellerManufacturers = useAppSelector(selectorResellerManufacturers);
  const licensesStatusOptionsId = useAppSelector(selectorResellerLicensesStatusOptionsId);

  const [resellerManufacturersList, setResellerManufacturersList] = useState<ManufacturerType[]>([]);

  useEffect(() => {
    const filteredResellerManufacturers =
      getFilteredResellerManufacturers(licensesStatusOptionsId, resellerManufacturers) || [];
    setResellerManufacturersList(filteredResellerManufacturers);
  }, [licensesStatusOptionsId, resellerManufacturers]);

  useEffect(() => {
    const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
    if (token) {
      dispatch(getResellerManufacturersThunk(token));
    }
  }, [dispatch]);
  return (
    <div className={classes.container}>
      <div className={classes.pageTitle}>{'Список закрепленных поставщиков'}</div>
      <ResellerManufacturersList manufacturers={resellerManufacturersList} />
    </div>
  );
};

export default ResellerCabinetMain;
