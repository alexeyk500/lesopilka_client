import React from 'react';
import classes from './CheckBoxBlue.module.css';
import checkStatusIco from '../../../img/checkStatusIco.svg';

type PropsType = {
  title: string;
  checked: boolean;
};

const CheckBoxBlue: React.FC<PropsType> = ({ title, checked }) => {
  return (
    <div className={classes.container}>
      {checked ? (
        <div className={classes.checkedBox}>
          <img src={checkStatusIco} className={classes.checkStatusIco} alt="check status ico" />
        </div>
      ) : (
        <div className={classes.box} />
      )}
      <div className={classes.title}>{title}</div>
    </div>
  );
};

export default CheckBoxBlue;
