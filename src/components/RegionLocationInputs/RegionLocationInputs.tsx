import React, { useCallback, useEffect, useState } from 'react';
import classes from './RegionLocationInputs.module.css';
import Selector from '../commonComponents/Selector/Selector';
import { useAppSelector } from '../../hooks/hooks';
import { selectorRegions } from '../../store/addressSlice';
import { LocationType } from '../../types/types';
import { getOptionsWithFirstEmptyOption } from '../../utils/functions';
import { serverApi } from '../../api/serverApi';
import { showErrorPopUp } from '../InfoAndErrorMessageForm/InfoAndErrorMessageForm';

const getLocationsByRegionId = async (regionId: number) => {
  try {
    return await serverApi.getLocationsByRegionId(regionId);
  } catch (e) {
    showErrorPopUp(`Ошибка получения Поисковых Локаций для Региона - ${regionId}`);
  }
};

const RegionLocationInputs: React.FC = () => {
  const regions = useAppSelector(selectorRegions);

  const [locationsByRegionId, setLocationsByRegionId] = useState<LocationType[]>([]);
  const [regionId, setRegionId] = useState<number | undefined>(undefined);
  const [locationId, setLocationId] = useState<number | undefined>(undefined);

  const locationsOptions = getOptionsWithFirstEmptyOption(locationsByRegionId);
  const regionsOptions = getOptionsWithFirstEmptyOption(regions);

  const getSelectedRegionOption = useCallback(() => {
    if (regionId && regionId > 0) {
      return regionsOptions.find((option) => option.id === regionId);
    } else {
      return undefined;
    }
  }, [regionId, regionsOptions]);

  const getSelectedLocationOption = useCallback(() => {
    if (locationId && locationId > 0) {
      return locationsOptions.find((option) => option.id === locationId);
    } else {
      return undefined;
    }
  }, [locationId, locationsOptions]);

  const selectedRegionOption = getSelectedRegionOption();
  const selectedLocationOption = getSelectedLocationOption();

  const onChangeRegion = (id: number) => {
    if (id > 0) {
      setRegionId(id);
      setLocationId(undefined);
    }
  };

  const onChangeLocationLocal = (id: number) => {
    if (id > 0) {
      setLocationId(id);
    }
  };

  useEffect(() => {
    if (regionId) {
      getLocationsByRegionId(regionId).then((locations) => {
        if (locations) {
          setLocationsByRegionId(locations);
        }
      });
    }
  }, [regionId]);

  return (
    <div className={classes.container}>
      <div className={classes.selectorContainer}>
        <div className={classes.titleSelector}>Регион</div>
        <Selector
          options={regionsOptions}
          selectedOption={selectedRegionOption}
          onChange={onChangeRegion}
          customClassName={classes.selector}
          dataTestId={'selectorRegion'}
        />
        <input
          className={classes.invisibleInput}
          tabIndex={-1}
          name="r6g1onId"
          autoComplete="off"
          value={regionId || ''}
          onChange={(e) => setRegionId(Number(e.target.value))}
          required
        />
      </div>
      <div className={classes.selectorContainer}>
        <div className={classes.titleSelector}>Населенный пункт</div>
        <Selector
          options={locationsOptions}
          selectedOption={selectedLocationOption}
          onChange={onChangeLocationLocal}
          customClassName={classes.selector}
          dataTestId={'selectorLocation'}
        />
        <input
          className={classes.invisibleInput}
          tabIndex={-1}
          name="l0cat10n"
          autoComplete="off"
          value={locationId || ''}
          required
          onChange={(e) => setLocationId(Number(e.target.value))}
        />
      </div>
    </div>
  );
};

export default RegionLocationInputs;
