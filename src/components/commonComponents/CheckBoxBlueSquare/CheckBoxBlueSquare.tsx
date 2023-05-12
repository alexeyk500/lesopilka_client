import React from 'react';
import classes from './CheckBoxBlueSquare.module.css';
import checkStatusIco from '../../../img/checkStatusIco.svg';
import classNames from 'classnames';

type PropsType = {
  id: number | string;
  title: string;
  checked: boolean;
  onSelect: (id: number | string) => void;
  additionalInfo?: string;
  disabled?: boolean;
  dataTestId?: string;
};

const CheckBoxBlueSquare: React.FC<PropsType> = ({
  id,
  title,
  checked,
  onSelect,
  additionalInfo,
  disabled,
  dataTestId,
}) => {
  const onClick = () => {
    onSelect(id);
  };
  return (
    <div className={classNames(classes.container, { [classes.containerDisabled]: disabled })}>
      <div
        className={classNames(classes.box, { [classes.checkedBox]: checked, [classes.disabled]: disabled })}
        onClick={onClick}
        data-test-id={dataTestId}
      >
        {checked && <img src={checkStatusIco} className={classes.checkStatusIco} alt="check status ico" />}
      </div>
      <div className={classes.title}>
        <div className={classes.constantWidth}>{title}</div>
        {additionalInfo && <div className={classes.additionalInfoTitle}>{additionalInfo}</div>}
      </div>
    </div>
  );
};

export default CheckBoxBlueSquare;
