import React, { useEffect } from 'react';
import classes from './SearchLocation.module.css';
import SectionContainer from '../SectionContainer/SectionContainer';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import {
  getRegionsThunk,
  getSearchLocationsByRegionIdThunk,
  selectorRegions,
  selectorSearchLocationsByRegionId,
} from '../../../../store/addressSlice';
import PlaceSelector from '../../../../components/commonComponents/PlaceSelector/PlaceSelector';
import { getOptionsWithFirstEmptyOption } from '../../../../utils/functions';
import { selectorUser, userUpdateThunk } from '../../../../store/userSlice';

const SearchLocation: React.FC = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectorUser);
  const regions = useAppSelector(selectorRegions);
  const searchRegionId = user?.searchRegion?.id;
  const searchLocationId = user?.searchLocation?.id;

  const searchLocationsByRegionId = useAppSelector(selectorSearchLocationsByRegionId);

  const regionsOptions = getOptionsWithFirstEmptyOption(regions);
  const searchLocationsOptions = getOptionsWithFirstEmptyOption(searchLocationsByRegionId);

  const onChangeRegion = (id: number) => {
    const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
    if (id > 0 && token) {
      dispatch(userUpdateThunk({ token, searchRegionId: id, searchLocationId: null }));
    }
  };

  useEffect(() => {
    dispatch(getRegionsThunk());
  }, [dispatch]);

  useEffect(() => {
    if (searchRegionId) {
      dispatch(getSearchLocationsByRegionIdThunk(searchRegionId));
    }
  }, [dispatch, searchRegionId]);

  const onChangeLocation = (id: number) => {
    const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
    if (id > 0 && token) {
      dispatch(userUpdateThunk({ token, searchLocationId: id }));
    }
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
