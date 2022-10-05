import React, { useEffect, useState } from 'react';
import classes from './Selector.module.css';
import classNames from 'classnames';
import { SelectOptionsType } from '../../../types/types';

type PropsType = {
  options: SelectOptionsType[];
  onChange: (value: string) => void;
  defaultOption?: SelectOptionsType;
  customOptionTitle?: string;
  hasNullChoice?: boolean;
  customClassName?: string;
};

const getStartedId = (options: SelectOptionsType[], defaultOption?: SelectOptionsType, hasNullChoice?: boolean) => {
  if (defaultOption) {
    return defaultOption.id;
  }
  if (hasNullChoice) {
    return undefined;
  }
  if (options.length > 0) {
    return options[0].id;
  }
  return undefined;
};

const Selector: React.FC<PropsType> = ({
  options,
  onChange,
  defaultOption,
  customOptionTitle,
  hasNullChoice,
  customClassName,
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | undefined>(
    getStartedId(options, defaultOption, hasNullChoice)
  );
  const [selectOptions, setSelectOptions] = useState<SelectOptionsType[]>([]);

  useEffect(() => {
    const fullOptions: SelectOptionsType[] = [];
    if (hasNullChoice) {
      fullOptions.push({ id: undefined, title: '' });
    }
    fullOptions.push(...options);
    if (customOptionTitle) {
      fullOptions.push({ id: '-1', title: customOptionTitle });
    }
    setSelectOptions(fullOptions);
  }, [hasNullChoice, options, customOptionTitle]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.currentTarget.value) {
      setSelectedOptionId(e.currentTarget.value);
      onChange && onChange(e.currentTarget.value);
    }
  };

  return (
    <div className={classNames(classes.container, { [customClassName!]: customClassName })}>
      <select value={selectedOptionId} className={classes.select} onChange={onChangeHandler}>
        {selectOptions.map((option, ind) => {
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
