import React, { useEffect, useState } from 'react';
import classes from './Selector.module.css';
import classNames from 'classnames';
import { SelectOptionsType } from '../../../types/types';

type PropsType = {
  options: SelectOptionsType[];
  onChange: (value: number) => void;
  selectedOption?: SelectOptionsType;
  customOptionTitle?: string;
  hasNullChoice?: boolean;
  customClassName?: string;
};

const getStartedId = (options: SelectOptionsType[], selectedOption?: SelectOptionsType, hasNullChoice?: boolean) => {
  if (selectedOption) {
    return selectedOption.id;
  }
  if (hasNullChoice) {
    return 0;
  }
  if (options.length > 0) {
    return options[0].id;
  }
  return 0;
};

const Selector: React.FC<PropsType> = ({
  options,
  selectedOption,
  onChange,
  customOptionTitle,
  hasNullChoice,
  customClassName,
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<number | undefined>(
    getStartedId(options, selectedOption, hasNullChoice)
  );
  const [selectOptions, setSelectOptions] = useState<SelectOptionsType[]>([]);

  useEffect(() => {
    const fullOptions: SelectOptionsType[] = [];
    if (hasNullChoice) {
      fullOptions.push({ id: 0, title: '' });
    }
    fullOptions.push(...options);
    if (customOptionTitle) {
      fullOptions.push({ id: -1, title: customOptionTitle });
    }
    setSelectOptions(fullOptions);
  }, [hasNullChoice, options, customOptionTitle]);

  useEffect(()=>{
    setSelectedOptionId(getStartedId(options, selectedOption, hasNullChoice))
  },[selectedOption])

  const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.currentTarget.value) {
      setSelectedOptionId(Number(e.currentTarget.value));
      onChange && onChange(Number(e.currentTarget.value));
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
