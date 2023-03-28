import React from 'react';
import classes from './LicensesMonitor.module.css';
import IconButton from '../IconButton/IconButton';
import buyLicenses from '../../../img/buyLicensesWhiteIco.svg';
import ButtonsSection from '../ButtonsSection/ButtonsSection';

const LicensesMonitor = () => {
  const licenseCount = 1250;
  const activeProducts = 130;

  return (
    <ButtonsSection title={'Лицензии'}>
      <div className={classes.infoContainer}>
        <div className={classes.rowContainer}>
          <span className={classes.title}>Товаров опубликовано</span>-
          <span className={classes.amount}>&nbsp;&nbsp;{activeProducts}</span>
        </div>
        <div className={classes.rowContainer}>
          <span className={classes.title}>Лицензий осталось</span>-
          <span className={classes.amount}>&nbsp;&nbsp;{licenseCount}</span>
        </div>
        <div className={classes.delimiter} />
        <div className={classes.rowCentered}>
          <span className={classes.title}>
            Осталось на
            <span className={classes.amount}>{Math.floor(licenseCount / activeProducts)}</span>
            на дней
          </span>
        </div>
      </div>
      <IconButton ico={buyLicenses} title={'Купить лицензии'} customIconClasses={classes.buyLicenses} />
    </ButtonsSection>
  );
};

export default LicensesMonitor;
