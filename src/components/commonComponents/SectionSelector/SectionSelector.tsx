import React from 'react';
import classes from './SectionSelector.module.css';
import Selector from '../Selector/Selector';
import { SelectOptionsType } from '../../../types/types';

type PropsType = {
  title: string;
  options: SelectOptionsType[];
  onChangeSelector: (id: number) => void;
  selectedOption?: SelectOptionsType;
  customSize?: string;
  onChangeCustomSize?: (value: string) => void;
};

const onlyDigitRegExp = /^[0-9\b]+$/;

const SectionSelector: React.FC<PropsType> = ({
  title,
  options,
  selectedOption,
  onChangeSelector,
  customSize,
  onChangeCustomSize,
}) => {
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '' || onlyDigitRegExp.test(e.target.value)) {
      onChangeCustomSize && onChangeCustomSize(e.currentTarget.value);
    }
  };

  return (
    <div className={classes.selectorGroupContainer}>
      <div className={classes.title}>{title}</div>
      <div className={classes.selectorContainer}>
        <Selector
          options={options}
          selectedOption={selectedOption}
          customClassName={classes.selector}
          onChange={onChangeSelector}
        />
      </div>
      {selectedOption && selectedOption.id === -1 && (
        <div className={classes.customSizeInputContainer}>
          <input className={classes.customSizeInput} value={customSize || ''} onChange={onChangeInput} type="text" />
          {'мм'}
        </div>
      )}
    </div>
  );
};

export default SectionSelector;
