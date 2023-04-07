import React from 'react';
import classes from './Preloader.module.css';
type PropsType = {
  title?: string;
};

const Preloader: React.FC<PropsType> = ({ title }) => {
  const preloaderTitle = title || 'Загрузка...';
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
      {preloaderTitle}
    </div>
  );
};

export default Preloader;
