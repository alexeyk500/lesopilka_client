import React, { useCallback, useEffect, useRef, useState } from 'react';
import classes from './SearchLocationSelector.module.css';
import selectorArrowIco from './../../../img/selectorArrow.svg';
import classNames from 'classnames';
import Selector from '../Selector/Selector';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import {
  getRegionsThunk,
  getSearchLocationsByRegionIdThunk,
  selectorAddressSliceIsLoading,
  selectorRegions,
  selectorSearchLocationsByRegionId,
} from '../../../store/addressSlice';
import {
  selectorIsUserChecked,
  selectorSearchLocationId,
  selectorSearchRegionId,
  selectorUser,
  setAppSearchLocationId,
  setAppSearchRegionId,
  userUpdateThunk,
} from '../../../store/userSlice';
import { getOptionsWithFirstEmptyOption } from '../../../utils/functions';
import { useSearchParams } from 'react-router-dom';
import useUpdatePlaceSearchParams from '../../../hooks/useUpdatePlaceSearchParams';
import useClickOutsideElement from '../../../hooks/useClickOutsideElement';

const SearchLocationSelector: React.FC = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectorUser);
  const regions = useAppSelector(selectorRegions);
  const isLoading = useAppSelector(selectorAddressSliceIsLoading);
  const searchLocationsByRegionId = useAppSelector(selectorSearchLocationsByRegionId);

  const regionsOptions = getOptionsWithFirstEmptyOption(regions);
  const searchLocationsOptions = getOptionsWithFirstEmptyOption(searchLocationsByRegionId);

  const [searchParams, setSearchParams] = useSearchParams();

  const isUserChecked = useAppSelector(selectorIsUserChecked);
  const searchRegionId = useAppSelector(selectorSearchRegionId);
  const searchLocationId = useAppSelector(selectorSearchLocationId);
  const newSearchParams = useUpdatePlaceSearchParams(searchParams);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isUserChecked) {
      setSearchParams(newSearchParams);
    }
  }, [isUserChecked, searchRegionId, searchLocationId, setSearchParams, newSearchParams]);

  useEffect(() => {
    dispatch(getRegionsThunk());
  }, [dispatch]);

  useEffect(() => {
    if (searchRegionId) {
      dispatch(getSearchLocationsByRegionIdThunk(searchRegionId));
    }
  }, [dispatch, searchRegionId]);

  const onChangeRegion = (id: number | null) => {
    if (user) {
      const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
      if (token) {
        dispatch(userUpdateThunk({ token, searchRegionId: id, searchLocationId: null }));
      }
    } else {
      dispatch(setAppSearchRegionId(id ? id : undefined));
      dispatch(setAppSearchLocationId(undefined));
    }
  };

  const onChangeLocation = (id: number | null) => {
    if (user) {
      const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
      if (token) {
        dispatch(userUpdateThunk({ token, searchLocationId: id }));
      }
    } else {
      dispatch(setAppSearchLocationId(id ? id : undefined));
    }
  };

  const [expand, setExpand] = useState(false);

  const onClickExpand = () => {
    setExpand((prev) => !prev);
  };

  useClickOutsideElement(ref, () => {
    setExpand(false);
  });

  const getSelectedRegionOption = useCallback(() => {
    if (searchRegionId && searchRegionId > 0) {
      return regionsOptions.find((option) => option.id === searchRegionId);
    } else {
      return undefined;
    }
  }, [searchRegionId, regionsOptions]);

  const getSelectedLocationOption = useCallback(() => {
    if (searchLocationId && searchLocationId > 0) {
      return searchLocationsOptions.find((option) => option.id === searchLocationId);
    } else {
      return undefined;
    }
  }, [searchLocationId, searchLocationsOptions]);

  const selectedRegionOption = getSelectedRegionOption();
  const selectedLocationOption = getSelectedLocationOption();

  const onChangeLocationLocal = (id: number) => {
    if (id > 0) {
      onChangeLocation(id);
    } else {
      onChangeLocation(null);
    }
    setExpand(false);
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
        <div className={classes.expandPart}>
          <div className={classes.selectorContainer}>
            <div className={classes.titleSelector}>Регион</div>
            <Selector
              options={regionsOptions}
              selectedOption={selectedRegionOption}
              onChange={onChangeRegion}
              customClassName={classes.selector}
              dataTestId={'searchRegionSelector'}
            />
          </div>
          <div className={classes.selectorContainer}>
            <div className={classes.titleSelector}>Населенный Пункт</div>
            {isLoading ? (
              <div className={classes.loading}>Загрузка...</div>
            ) : (
              <Selector
                options={searchLocationsOptions}
                selectedOption={selectedLocationOption}
                onChange={onChangeLocationLocal}
                customClassName={classes.selector}
                dataTestId={'searchLocationSelector'}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchLocationSelector;
