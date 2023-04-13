import React from 'react';
import classes from './Selector.module.css';
import classNames from 'classnames';
import { OptionsType } from '../../../types/types';

type PropsType = {
  options: OptionsType[];
  onChange: (value: number) => void;
  selectedOption?: OptionsType;
  customClassName?: string;
  dataTestId?: string;
};

const Selector: React.FC<PropsType> = ({ options, selectedOption, onChange, customClassName, dataTestId }) => {
  const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.currentTarget.value) {
      onChange && onChange(Number(e.currentTarget.value));
    }
  };

  return (
    <div className={classNames(classes.container, { [customClassName!]: customClassName })}>
      <select
        value={selectedOption ? selectedOption.id : 0}
        className={classes.select}
        onChange={onChangeHandler}
        data-test-id={dataTestId}
      >
        {options.map((option, ind) => {
          return (
            <option key={ind} value={option.id}>
              {option.title}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Selector;
