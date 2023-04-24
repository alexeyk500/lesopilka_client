import React from 'react';
import classes from './SectionSelector.module.css';
import Selector from '../Selector/Selector';
import { OptionsType } from '../../../types/types';
import { regExpOnlyDigit } from '../../../utils/constants';

type PropsType = {
  options: OptionsType[];
  onChangeSelector: (id: number) => void;
  title?: string;
  selectedOption?: OptionsType;
  showCustomSizeInput?: boolean;
  customSizeInputValue?: string;
  onChangeCustomSize?: (value: string | undefined) => void;
  dataTestId?: string;
};

const SectionSelector: React.FC<PropsType> = ({
  title,
  options,
  selectedOption,
  onChangeSelector,
  customSizeInputValue,
  onChangeCustomSize,
  showCustomSizeInput,
  dataTestId,
}) => {
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '' || regExpOnlyDigit.test(e.target.value)) {
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
          dataTestId={dataTestId}
        />
      </div>
      {showCustomSizeInput && (
        <div className={classes.customSizeInputContainer}>
          <input
            className={classes.customSizeInput}
            value={customSizeInputValue || ''}
            onChange={onChangeInput}
            type="text"
            data-test-id={`${dataTestId}CustomSize`}
          />
          {'мм'}
        </div>
      )}
    </div>
  );
};

export default SectionSelector;
