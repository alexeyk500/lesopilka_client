import React from 'react';
import classes from './AmountInput.module.css';

import plusBlueIco from './../../img/plusBlueIco.svg';
import minesBlueIco from './../../img/minesBlueIco.svg';
import { regExpOnlyDigit } from '../../utils/constants';

type PropsType = {
  amount: number;
  onChangeAmount: (value: number | string) => void;
};

const AmountInput: React.FC<PropsType> = ({ amount, onChangeAmount }) => {
  const onClickInc = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    onChangeAmount(amount + 1);
  };

  const onClickDec = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    onChangeAmount(amount - 1);
  };

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '' || regExpOnlyDigit.test(event.target.value)) {
      onChangeAmount(event.target.value);
    }
  };

  const onBlurInput = () => {
    if (!amount) {
      onChangeAmount(1);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.btnContainer} onClick={onClickDec} data-test-id={'minesAmountBtn'}>
        <img src={minesBlueIco} alt="mines" />
      </div>
      <div className={classes.inputContainer}>
        <input
          value={amount ? amount : ''}
          className={classes.input}
          type="text"
          onChange={onChangeInput}
          onBlur={onBlurInput}
        />
      </div>
      <div className={classes.btnContainer} onClick={onClickInc} data-test-id={'addAmountBtn'}>
        <img src={plusBlueIco} alt="plus" />
      </div>
    </div>
  );
};

export default AmountInput;
