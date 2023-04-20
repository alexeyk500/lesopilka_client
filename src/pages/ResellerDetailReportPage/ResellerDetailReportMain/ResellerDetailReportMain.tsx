import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import {
  getResellerManufacturersThunk,
  selectorResellerDetailReportDate,
  selectorResellerManufacturers,
} from '../../../store/resellerSlice';
import classes from '../../ResellerCabinetPage/ResellerCabinetMain/ResellerCabinetMain.module.css';
import { formatUTCtoDDMMMMYYYY } from '../../../utils/dateTimeFunctions';
import DetailReportResellerManufacturersList from './DetailReportResellerManufacturersList/DetailReportResellerManufacturersList';

const ResellerDetailReportMain: React.FC = () => {
  const dispatch = useAppDispatch();
  const resellerManufacturers = useAppSelector(selectorResellerManufacturers);
  const reportDate = useAppSelector(selectorResellerDetailReportDate);
  const reportDateStr = formatUTCtoDDMMMMYYYY(new Date(reportDate).toString()).replace('.', 'ода');

  useEffect(() => {
    const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
    if (token && reportDate) {
      dispatch(getResellerManufacturersThunk(token));
    }
  }, [dispatch, reportDate]);

  return (
    <div className={classes.container}>
      <div className={classes.pageTitle}>{`Публикации поставщиков на ${reportDateStr}`}</div>
      <DetailReportResellerManufacturersList resellerManufacturers={resellerManufacturers} />
    </div>
  );
};

export default ResellerDetailReportMain;
