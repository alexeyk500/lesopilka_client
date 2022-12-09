import React from 'react';
import classes from './LicensesMonitor.module.css';
import IconButton from '../IconButton/IconButton';
import buyLicenses from '../../../img/buyLicensesWhiteIco.svg';
import ButtonsSection from '../ButtonsSection/ButtonsSection';

const LicensesMonitor = () => {
  return (
    <ButtonsSection title={'Лицензии'}>
      <div className={classes.infoContainer}>
        <div className={classes.rowContainer}>
          <span className={classes.title}>Позиций опубликовано</span>-
          <span className={classes.amount}>&nbsp;&nbsp;{'64'}</span>
        </div>
        <div className={classes.rowContainer}>
          <span className={classes.title}>Куплено лизензий</span>-
          <span className={classes.amount}>&nbsp;&nbsp;{'1250'}</span>
        </div>
        <div className={classes.delimiter} />
        <div className={classes.rowContainer}>
          <span className={classes.title}>Осталось лизензий</span>-
          <span className={classes.amount}>&nbsp;&nbsp;{'940'}</span>
        </div>
      </div>
      <IconButton ico={buyLicenses} title={'Купить лицензии'} customIconClasses={classes.buyLicenses} />
    </ButtonsSection>
  );
};

export default LicensesMonitor;
