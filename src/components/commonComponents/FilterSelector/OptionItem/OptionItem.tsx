import React from 'react';
import { OptionsType } from '../../../../types/types';
import classes from './OptionItem.module.css';

type PropsType = {
  option: OptionsType;
  selectedOptionId?: number;
  onSelect?: (id: number | undefined) => void;
};

const OptionItem: React.FC<PropsType> = ({ option, selectedOptionId, onSelect }) => {
  const onChangeHandler = () => {
    if (onSelect && option.id) {
      if (option.id === selectedOptionId) {
        onSelect(undefined);
      } else {
        onSelect(option.id);
      }
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
      <div className={classes.title}>{option.title}</div>
    </div>
  );
};

export default OptionItem;
