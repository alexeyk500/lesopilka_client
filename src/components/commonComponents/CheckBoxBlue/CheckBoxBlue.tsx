import React from 'react';
import classes from './CheckBoxBlue.module.css';
import checkStatusIco from '../../../img/checkStatusIco.svg';

type PropsType = {
  id: string;
  title: string;
  checked: boolean;
  onSelect: (id: string) => void;
};

const CheckBoxBlue: React.FC<PropsType> = ({ id, title, checked, onSelect }) => {
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
      <div className={classes.title}>{title}</div>
    </div>
  );
};

export default CheckBoxBlue;
