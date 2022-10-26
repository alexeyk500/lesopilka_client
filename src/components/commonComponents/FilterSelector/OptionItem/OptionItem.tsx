import React from 'react';
import { OptionsType } from '../../../../types/types';
import classes from './OptionItem.module.css';

type PropsType = {
  option: OptionsType;
  selectedOptionId?: number;
  onSelect?: (id: number) => void;
};

const OptionItem: React.FC<PropsType> = ({ option, selectedOptionId, onSelect }) => {
  const onChangeHandler = () => {
    if (onSelect && option.id) {
      onSelect(option.id);
    }
  };

  return (
    <div className={classes.container}>
      <input
        type={'checkbox'}
        className={classes.checkbox}
        checked={option.id === selectedOptionId}
        onChange={onChangeHandler}
      />
      {option.title}
    </div>
  );
};

export default OptionItem;
