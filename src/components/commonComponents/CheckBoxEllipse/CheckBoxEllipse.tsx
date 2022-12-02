import React from 'react';
import classes from './CheckBoxEllipse.module.css';
import classNames from 'classnames';

type PropsType = {
  title: string;
  checked: boolean;
  onSelect: (isChecked?: boolean) => void;
};

const CheckBoxEllipse: React.FC<PropsType> = ({ title, checked, onSelect }) => {
  const onClick = () => {
    onSelect && onSelect(checked);
  };

  return (
    <div className={classes.container}>
      <div className={classes.title}>{title}</div>
      <div className={classes.containerSelect} onClick={onClick}>
        <div className={classNames(classes.notChecked, { [classes.checked]: checked })} />
      </div>
    </div>
  );
};

export default CheckBoxEllipse;
