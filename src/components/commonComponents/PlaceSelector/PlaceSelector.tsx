import React, { useEffect, useRef, useState } from 'react';
import classes from './PlaceSelector.module.css';
import selectorArrowIco from './../../../img/selectorArrow.svg';
import classNames from 'classnames';
import Selector from '../Selector/Selector';
import { SelectOptionsType } from '../../../types/types';

type PropsType = {
  regionsOptions: SelectOptionsType[];
  selectedRegionOption: SelectOptionsType | undefined;
  onChangeRegion: (id: number) => void;
};

const PlaceSelector: React.FC<PropsType> = ({ regionsOptions, selectedRegionOption, onChangeRegion }) => {
  const [expand, setExpand] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const onClickExpand = () => {
    setExpand((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (event && event.target && ref.current && !ref.current.contains(event.target as HTMLElement)) {
        setExpand(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  return (
    <div ref={ref} className={classNames(classes.container, { [classes.containerExpand]: expand })}>
      <div className={classes.row} onClick={onClickExpand}>
        <div className={classes.title}>{selectedRegionOption ? selectedRegionOption.title : ''}</div>
        <img src={selectorArrowIco} className={classes.selectorArrowIco} alt="selector arrow" />
      </div>
      {expand && (
        <div className={classes.expandContainer}>
          <div className={classes.selectorContainer}>
            <div className={classes.titleSelector}>Регион</div>
            <Selector
              options={regionsOptions}
              selectedOption={selectedRegionOption}
              onChange={onChangeRegion}
              customClassName={classes.selector}
            />
          </div>
          <div className={classes.selectorContainer}>
            <div className={classes.titleSelector}>Населенный Пункт</div>
            <Selector
              options={regionsOptions}
              selectedOption={selectedRegionOption}
              onChange={onChangeRegion}
              customClassName={classes.selector}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaceSelector;
