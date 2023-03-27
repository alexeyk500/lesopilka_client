import React from 'react';
import classes from './LicensesStatistics.module.css';
import ButtonsSection from '../ButtonsSection/ButtonsSection';

const LicensesStatistics = () => {
  const daysAmount = 65;
  const licenseAmount = 1234;

  return (
    <ButtonsSection title={'Статистика'}>
      <div className={classes.infoContainer}>
        <div className={classes.rowContainer}>
          <span className={classes.title}>Количество дней</span>-
          <span className={classes.amount}>&nbsp;&nbsp;{daysAmount}</span>
        </div>
        <div className={classes.rowContainer}>
          <span className={classes.title}>Использовано лицензий</span>-
          <span className={classes.amount}>&nbsp;&nbsp;{licenseAmount}</span>
        </div>
        <div className={classes.delimiter} />
        <div className={classes.rowContainer}>
          <span className={classes.title}>В среднем за день</span>-
          <span className={classes.amount}>&nbsp;&nbsp;{Math.ceil(licenseAmount / daysAmount)}</span>
        </div>
      </div>
    </ButtonsSection>
  );
};

export default LicensesStatistics;
