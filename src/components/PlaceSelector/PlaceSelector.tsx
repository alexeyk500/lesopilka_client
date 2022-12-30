import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import classes from './PlaceSelector.module.css';
import selectorArrowIco from '../../img/selectorArrow.svg';
import Selector from '../commonComponents/Selector/Selector';
import useClickOutsideElement from '../../hooks/useClickOutsideElement';
import { useAppSelector } from '../../hooks/hooks';
import { selectorRegions } from '../../store/addressSlice';
import { getOptionsWithFirstEmptyOption, getSelectedOption } from '../../utils/functions';
import { LocationType, OptionsType } from '../../types/types';
import { serverApi } from '../../api/serverApi';
import { showErrorPopUp } from '../InfoAndErrorMessageForm/InfoAndErrorMessageForm';

type PropsType = {
  onSelectLocation: (option: OptionsType | undefined) => void;
};

const PlaceSelector: React.FC<PropsType> = ({ onSelectLocation }) => {
  const [regionId, setRegionId] = useState<number | undefined>(undefined);
  const [locationId, setLocationId] = useState<number | undefined>(undefined);
  const [locationsByRegionId, setLocationsByRegionId] = useState<LocationType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const regions = useAppSelector(selectorRegions);
  const ref = useRef<HTMLDivElement>(null);
  const [expand, setExpand] = useState(false);

  const regionsOptions = getOptionsWithFirstEmptyOption(regions);
  const locationsOptions = getOptionsWithFirstEmptyOption(locationsByRegionId, 'Выберите населенный пункт');
  const selectedRegionOption = getSelectedOption(regionId, regionsOptions);
  const selectedLocationOption = getSelectedOption(locationId, locationsByRegionId);

  const onClickExpand = () => {
    setExpand((prev) => !prev);
  };

  useClickOutsideElement(ref, () => {
    setExpand(false);
  });

  const onChangeRegion = (id: number) => {
    setRegionId(id);
  };

  const onChangeLocation = (id: number) => {
    setLocationId(id);
    onSelectLocation(id > 0 ? getSelectedOption(id, locationsByRegionId) : undefined);
    setExpand(false);
  };

  useEffect(() => {
    if (regionId && regionId > 0) {
      try {
        setIsLoading(true);
        serverApi.getLocationsByRegionId(regionId).then((result) => {
          setIsLoading(false);
          setLocationsByRegionId(result);
        });
      } catch (e) {
        setLocationsByRegionId([]);
        showErrorPopUp(`Ошибка получения Локаций для Региона - ${regionId}`);
      }
    } else {
      setLocationsByRegionId([]);
    }
  }, [regionId]);

  return (
    <div ref={ref} className={classNames(classes.container, { [classes.containerExpand]: expand })}>
      <div className={classes.row} onClick={onClickExpand}>
        <div className={classes.title}>
          {selectedRegionOption
            ? selectedLocationOption
              ? selectedLocationOption.title
              : selectedRegionOption.title
            : 'Выберите регион'}
        </div>
        <img src={selectorArrowIco} className={classes.selectorArrowIco} alt="selector arrow" />
      </div>
      {expand && (
        <div className={classes.expandPart}>
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
                onChange={onChangeLocation}
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
