import React from 'react';
import classes from './SectionSelector.module.css';
import Selector from '../Selector/Selector';
import { OptionsType } from '../../../types/types';

type PropsType = {
  options: OptionsType[];
  onChangeSelector: (id: number) => void;
  title?: string;
  selectedOption?: OptionsType;
  customSize?: string;
  onChangeCustomSize?: (value: string | undefined) => void;
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
      onChangeCustomSize && onChangeCustomSize(e.currentTarget.value ? e.currentTarget.value : undefined);
    }
  };

  return (
    <div className={classes.selectorGroupContainer}>
      {title && <div className={classes.title}>{title}</div>}
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
