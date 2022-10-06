import React from 'react';
import classes from './CheckIndicator.module.css';
import checkStatusIco from '../../../img/checkStatusIco.svg';

type PropsType = {
  title: string;
  checked: boolean | undefined;
};

const CheckIndicator: React.FC<PropsType> = ({ title, checked }) => {
  return (
    <div className={classes.container}>
      <div className={classes.topLine}>
        {checked ? (
          <div className={classes.checkedRound}>
            <img src={checkStatusIco} className={classes.checkStatusIco} alt="check status ico" />
          </div>
        ) : (
          <div className={classes.round} />
        )}
        <div className={classes.title}>{title}</div>
      </div>
      <div className={classes.bottomLine} />
    </div>
  );
};

export default CheckIndicator;
