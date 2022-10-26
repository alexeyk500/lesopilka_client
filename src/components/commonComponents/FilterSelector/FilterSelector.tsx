import React, { useState } from 'react';
import classes from './FilterSelector.module.css';
import classNames from 'classnames';
import selectorArrowIco from '../../../img/selectorArrow.svg';
import { OptionsType } from '../../../types/types';
import OptionItem from './OptionItem/OptionItem';

type PropsType = {
  title: string;
  options: OptionsType[];
  selectedOptionId?: number;
  onSelect?: (id: number) => void;
  isExpand?: boolean;
};

const FilterSelector: React.FC<PropsType> = ({ title, options, selectedOptionId, onSelect, isExpand }) => {
  const [expand, setExpand] = useState(isExpand ?? false);

  const onClickExpand = () => {
    setExpand((prev) => !prev);
  };

  return (
    <div className={classes.container}>
      <div className={classes.titlePart}>
        <div className={classes.row} onClick={onClickExpand}>
          <div className={classes.title}>{title}</div>
          <img
            src={selectorArrowIco}
            className={classNames(classes.selectorArrowIco, { [classes.rotate]: expand })}
            alt="selector arrow"
          />
        </div>
      </div>
      {expand && (
        <div className={classes.expandPart}>
          {options.map((option) => (
            <OptionItem key={option.id} option={option} selectedOptionId={selectedOptionId} onSelect={onSelect} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterSelector;
