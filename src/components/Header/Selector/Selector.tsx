import React, { useState } from 'react';
import classes from './Selector.module.css';
import classNames from 'classnames';

type PropsType = {
  options: string[];
  onChange?: (value: string) => void;
  customClassName?: string;
};

const Selector: React.FC<PropsType> = ({ options, onChange, customClassName }) => {
  const [selectedValue, setSelectedValue] = useState(options[0]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(e.currentTarget.value);
    onChange && onChange(e.currentTarget.value);
  };

  return (
    <div className={classNames(classes.container, { [customClassName!]: customClassName })}>
      <select value={selectedValue} className={classes.select} onChange={onChangeHandler}>
        {options.map((option, ind) => {
          return (
            <option key={ind} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Selector;
