import React from 'react';
import classes from './AmountInput.module.css';

import plusBlueIco from './../../img/plusBlueIco.svg';
import minesBlueIco from './../../img/minesBlueIco.svg';

const AmountInput = () => {
  return (
    <div className={classes.container}>
      <div className={classes.btnContainer}>
        <img src={plusBlueIco} alt="plus" />
      </div>
      <div className={classes.inputContainer}>
        <input value={'12'} className={classes.input} type="text" />
      </div>
      <div className={classes.btnContainer}>
        <img src={minesBlueIco} alt="plus" />
      </div>
    </div>
  );
};

export default AmountInput;
