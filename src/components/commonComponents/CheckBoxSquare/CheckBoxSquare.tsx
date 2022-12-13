import React from 'react';
import classes from './CheckBoxSquare.module.css';
import checkStatusIco from '../../../img/checkStatusIco.svg';
import classNames from 'classnames';

type PropsType = {
  id: number;
  title: string;
  checked: boolean;
  onSelect: (id: number) => void;
  amount?: number;
};

const CheckBoxSquare: React.FC<PropsType> = ({ id, title, checked, onSelect, amount }) => {
  const onClick = () => {
    onSelect(id);
  };
  return (
    <div className={classes.container} onClick={onClick}>
      {checked ? (
        <div className={classes.checkedBox}>
          <img src={checkStatusIco} className={classes.checkStatusIco} alt="check status ico" />
        </div>
      ) : (
        <div className={classes.box} />
      )}
      <div className={classes.title}>
        <div className={classNames({ [classes.constantWidth]: amount })}>{title}</div>
        {amount && <div className={classes.amountTitle}>&nbsp;&nbsp;{amount}</div>}
      </div>
    </div>
  );
};

export default CheckBoxSquare;
