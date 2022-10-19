import React, { useCallback, useEffect, useRef, useState } from 'react';
import classes from './PlaceSelector.module.css';
import selectorArrowIco from './../../../img/selectorArrow.svg';
import classNames from 'classnames';
import Selector from '../Selector/Selector';
import { SelectOptionsType } from '../../../types/types';
import { useAppSelector } from '../../../hooks/hooks';
import { selectorAddressSliceIsLoading } from '../../../store/addressSlice';

type PropsType = {
  regionsOptions: SelectOptionsType[];
  locationsOptions: SelectOptionsType[];
  selectedRegionId: number | undefined;
  selectedLocationId: number | undefined;
  onChangeRegion: (id: number) => void;
  onChangeLocation: (id: number) => void;
};

const PlaceSelector: React.FC<PropsType> = ({
  regionsOptions,
  locationsOptions,
  selectedRegionId,
  selectedLocationId,
  onChangeRegion,
  onChangeLocation,
}) => {
  const [expand, setExpand] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isLoading = useAppSelector(selectorAddressSliceIsLoading);

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

  const getSelectedRegionOption = useCallback(() => {
    if (selectedRegionId && selectedRegionId > 0) {
      return regionsOptions.find((option) => option.id === selectedRegionId);
    } else {
      return undefined;
    }
  }, [selectedRegionId, regionsOptions]);

  const getSelectedLocationOption = useCallback(() => {
    if (selectedLocationId && selectedLocationId > 0) {
      return locationsOptions.find((option) => option.id === selectedLocationId);
    } else {
      return undefined;
    }
  }, [selectedLocationId, locationsOptions]);

  const selectedRegionOption = getSelectedRegionOption();
  const selectedLocationOption = getSelectedLocationOption();

  const onChangeLocationLocal = (id: number) => {
    if (id > 0) {
      onChangeLocation(id);
      setExpand(false);
    }
  };

  return (
    <div ref={ref} className={classNames(classes.container, { [classes.containerExpand]: expand })}>
      <div className={classes.row} onClick={onClickExpand}>
        <div className={classes.title}>
          {selectedRegionOption
            ? selectedLocationOption
              ? selectedLocationOption.title
              : selectedRegionOption.title
            : ''}
        </div>
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
            {isLoading ? (
              <div className={classes.loading}>Загрузка...</div>
            ) : (
              <Selector
                options={locationsOptions}
                selectedOption={selectedLocationOption}
                onChange={onChangeLocationLocal}
                customClassName={classes.selector}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaceSelector;
