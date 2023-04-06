import React, { useEffect } from 'react';
import classes from './LicensesMonitor.module.css';
import IconButton from '../IconButton/IconButton';
import buyLicenses from '../../../img/buyLicensesWhiteIco.svg';
import ButtonsSection from '../ButtonsSection/ButtonsSection';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import {
  getManufacturerLicensesInfoThunk,
  selectorManufacturerActiveProductCardAmount,
  selectorManufacturerRestLicenseAmount,
} from '../../../store/manLicensesSlice';
import { lastDigitToWord } from '../../../utils/dateTimeFunctions';

const dayWords = ['день', 'дня', 'дней'];

const LicensesMonitor = () => {
  const dispatch = useAppDispatch();
  const licenseCount = useAppSelector(selectorManufacturerRestLicenseAmount);
  const activeProducts = useAppSelector(selectorManufacturerActiveProductCardAmount);

  useEffect(() => {
    const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
    if (token) {
      dispatch(getManufacturerLicensesInfoThunk({ token }));
    }
  }, [dispatch]);

  let publicationsDayAmount;
  if (licenseCount && activeProducts) {
    publicationsDayAmount = Math.floor(licenseCount / activeProducts);
  }

  const monthDaysAmountWord = lastDigitToWord(publicationsDayAmount, dayWords);

  return (
    <ButtonsSection title={'Лицензии'}>
      <div className={classes.infoContainer}>
        <div className={classes.rowContainer}>
          <span className={classes.title}>Товаров опубликовано</span>-
          <span className={classes.amount}>&nbsp;&nbsp;{activeProducts}</span>
        </div>
        <div className={classes.rowContainer}>
          <span className={classes.title}>Лицензий в наличии</span>-
          <span className={classes.amount}>&nbsp;&nbsp;{licenseCount}</span>
        </div>
        {publicationsDayAmount && (
          <>
            <div className={classes.delimiter} />
            <div className={classes.rowCentered}>
              <span className={classes.title}>
                Достаточно на
                <span className={classes.amount}>{publicationsDayAmount}</span>
                {monthDaysAmountWord}
              </span>
            </div>
          </>
        )}
      </div>
      <IconButton ico={buyLicenses} title={'Купить лицензии'} customIconClasses={classes.buyLicenses} />
    </ButtonsSection>
  );
};

export default LicensesMonitor;
