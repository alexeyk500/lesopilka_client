import React from 'react';
import classes from './ResellerCabinetMain.module.css';

const ResellerCabinetMain: React.FC = () => {
  return (
    <div className={classes.container}>
      <div className={classes.pageTitle}>{'Список поставщиков пиломатериалов'}</div>
    </div>
  );
};

export default ResellerCabinetMain;
