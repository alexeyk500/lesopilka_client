import React from 'react';
import classes from './Preloader.module.css';

const Preloader = () => {
  return (
    <div className={classes.container}>
      <div className={classes.lds_spinner}>
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
      Загрузка...
    </div>
  );
};

export default Preloader;
