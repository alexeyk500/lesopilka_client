import React from 'react';
import classes from './CheckBoxBlueSquare.module.css';
import checkStatusIco from '../../../img/checkStatusIco.svg';

type PropsType = {
  id: number | string;
  title: string;
  checked: boolean;
  onSelect: (id: number | string) => void;
  additionalInfo?: string;
};

const CheckBoxBlueSquare: React.FC<PropsType> = ({ id, title, checked, onSelect, additionalInfo }) => {
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
        <div className={classes.constantWidth}>{title}</div>
        {additionalInfo && <div className={classes.additionalInfoTitle}>{additionalInfo}</div>}
      </div>
    </div>
  );
};

export default CheckBoxBlueSquare;