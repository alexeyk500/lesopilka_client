import React from 'react';
import classes from './SectionSelector.module.css';
import Selector from '../Selector/Selector';
import { SelectOptionsType } from '../../../types/types';

type PropsType = {
  title: string;
  options: SelectOptionsType[];
  onChangeSelector: (id: number) => void;
  selectedOption?: SelectOptionsType;
  hasNullChoice?: boolean;
  customOptionTitle?: string;
};

const SectionSelector: React.FC<PropsType> = ({
  title,
  options,
  selectedOption,
  onChangeSelector,
  hasNullChoice = true,
  customOptionTitle,
}) => {
  return (
    <div className={classes.selectorGroupContainer}>
      <div className={classes.title}>{title}</div>
      <div className={classes.selectorContainer}>
        <Selector
          hasNullChoice={hasNullChoice}
          options={options}
          selectedOption={selectedOption}
          customClassName={classes.selector}
          onChange={onChangeSelector}
          customOptionTitle={customOptionTitle}
        />
      </div>
    </div>
  );
};

export default SectionSelector;
