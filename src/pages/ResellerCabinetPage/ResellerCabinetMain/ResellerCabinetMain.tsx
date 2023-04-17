import React, { useEffect } from 'react';
import classes from './ResellerCabinetMain.module.css';
import ResellerManufacturersList from './ResellerManufacturersList/ResellerManufacturersList';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { getResellerManufacturersThunk, selectorResellerManufacturers } from '../../../store/resellerSlice';

const ResellerCabinetMain: React.FC = () => {
  const dispatch = useAppDispatch();
  const resellerManufacturers = useAppSelector(selectorResellerManufacturers);

  useEffect(() => {
    const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
    if (token) {
      dispatch(getResellerManufacturersThunk(token));
    }
  }, [dispatch]);
  return (
    <div className={classes.container}>
      <div className={classes.pageTitle}>{'Список закрепленных поставщиков'}</div>
      <ResellerManufacturersList manufacturers={resellerManufacturers} />
    </div>
  );
};

export default ResellerCabinetMain;
