import React, { useCallback, useEffect, useState } from 'react';
import classes from './ManufacturerAddressData.module.css';
import Selector from '../../../../../components/commonComponents/Selector/Selector';
import { getOptionsWithFirstEmptyOption } from '../../../../../utils/functions';
import { useAppSelector } from '../../../../../hooks/hooks';
import { selectorRegions } from '../../../../../store/addressSlice';
import { serverApi } from '../../../../../api/serverApi';
import { showErrorPopUp } from '../../../../../components/InfoAndErrorMessageForm/InfoAndErrorMessageForm';
import { LocationType } from '../../../../../types/types';

const getLocationsByRegionId = async (regionId: number) => {
  try {
    return await serverApi.getLocationsByRegionId(regionId);
  } catch (e) {
    showErrorPopUp(`Ошибка получения Поисковых Локаций для Региона - ${regionId}`);
  }
};

const ManufacturerAddressData: React.FC = () => {
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
      <div className={classes.title}>Юридический адрес:</div>
      <div className={classes.selectorContainer}>
        <div className={classes.titleSelector}>Регион</div>
        <Selector
          options={regionsOptions}
          selectedOption={selectedRegionOption}
          onChange={onChangeRegion}
          customClassName={classes.selector}
        />
        <input
          className={classes.invisibleInput}
          tabIndex={-1}
          name="r6gionId"
          autoComplete="off"
          value={regionId}
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
        />
        <input
          className={classes.invisibleInput}
          tabIndex={-1}
          name="locationId"
          autoComplete="off"
          value={locationId}
          required
        />
      </div>
      <div className={classes.rowDataContainer}>
        <div className={classes.titleSelector}>{'Улица :'}</div>
        <input className={classes.input} name="str66t" type="text" placeholder={'Введите улицу'} required />
      </div>
      <div className={classes.rowDataContainer}>
        <div className={classes.titleSelector}>{'Дом :'}</div>
        <input className={classes.input} name="bu1ld1ng" type="text" placeholder={'Введите дом'} required />
      </div>
      <div className={classes.rowDataContainer}>
        <div className={classes.titleSelector}>{'Офис:'}</div>
        <input className={classes.input} name="off1c6" type="text" placeholder={'Введите офис'} required />
      </div>
    </div>
  );
};

export default ManufacturerAddressData;
