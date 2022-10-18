import React from 'react';
import classes from './SearchLocation.module.css';
import SectionContainer from '../SectionContainer/SectionContainer';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import {
  getSearchLocationsByRegionIdThunk,
  selectorRegions,
  selectorSearchLocationId,
  selectorSearchLocationsByRegionId,
  selectorSearchRegionId,
  setSearchLocationId,
} from '../../../../store/addressSlice';
import PlaceSelector from '../../../../components/commonComponents/PlaceSelector/PlaceSelector';
import { getOptionsWithFirstEmptyOption } from '../../../../utils/functions';

const SearchLocation: React.FC = () => {
  const dispatch = useAppDispatch();

  const regions = useAppSelector(selectorRegions);
  const searchRegionId = useAppSelector(selectorSearchRegionId);
  const searchLocationId = useAppSelector(selectorSearchLocationId);
  const searchLocationsByRegionId = useAppSelector(selectorSearchLocationsByRegionId);

  const regionsOptions = getOptionsWithFirstEmptyOption(regions);
  const searchLocationsOptions = getOptionsWithFirstEmptyOption(searchLocationsByRegionId);

  const onChangeRegion = (id: number) => {
    id > 0 && dispatch(getSearchLocationsByRegionIdThunk(id));
  };

  const onChangeLocation = (id: number) => {
    dispatch(setSearchLocationId(id));
  };

  return (
    <SectionContainer title={'Территориальный поиск'}>
      <div className={classes.content}>
        <div className={classes.rowContainer}>
          <div className={classes.field}>
            <label className={classes.label}>
              <input
                className={classes.inputInvisible}
                name="searchLocationId"
                defaultValue={searchRegionId ? searchRegionId : undefined}
                required
              />
              <div className={classes.selectorContainer}>
                <div className={classes.selectorLabel}>{`Поиск товаров начинать с территории`}</div>
                <PlaceSelector
                  regionsOptions={regionsOptions}
                  locationsOptions={searchLocationsOptions}
                  selectedRegionId={searchRegionId}
                  selectedLocationId={searchLocationId}
                  onChangeRegion={onChangeRegion}
                  onChangeLocation={onChangeLocation}
                />
              </div>
            </label>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default SearchLocation;
