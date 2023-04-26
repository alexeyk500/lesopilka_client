import React from 'react';
import { OptionsType } from '../../../../types/types';
import classes from './OptionItem.module.css';

type PropsType = {
  option: OptionsType;
  selectedOptionId?: number;
  onSelect?: (id: number | undefined) => void;
  dataTestId?: string;
};

const OptionItem: React.FC<PropsType> = ({ option, selectedOptionId, onSelect, dataTestId }) => {
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
        data-test-id={dataTestId}
      />
      <div className={classes.title}>{option.title}</div>
    </div>
  );
};

export default OptionItem;
