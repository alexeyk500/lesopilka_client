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
  selectorAppSearchLocationId,
  selectorAppSearchRegionId,
  selectorUser,
  setAppSearchLocationId,
  setAppSearchRegionId,
  userUpdateThunk,
} from '../../../store/userSlice';
import { getOptionsWithFirstEmptyOption } from '../../../utils/functions';
import { useSearchParams } from 'react-router-dom';
import { QueryEnum } from '../../../types/types';

const SearchLocationSelector: React.FC = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectorUser);
  const regions = useAppSelector(selectorRegions);
  const appSearchRegionId = useAppSelector(selectorAppSearchRegionId);
  const appSearchRLocationId = useAppSelector(selectorAppSearchLocationId);
  const searchLocationsByRegionId = useAppSelector(selectorSearchLocationsByRegionId);

  const searchRegionId = user ? user?.searchRegion?.id : appSearchRegionId;
  const searchLocationId = user ? user?.searchLocation?.id : appSearchRLocationId;

  const regionsOptions = getOptionsWithFirstEmptyOption(regions);
  const searchLocationsOptions = getOptionsWithFirstEmptyOption(searchLocationsByRegionId);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    let isNeedToUpdateSearchParams = false;
    const querySearchRegionId = Number(searchParams.get(QueryEnum.SearchRegionId));
    const querySearchLocationId = Number(searchParams.get(QueryEnum.SearchLocationId));
    if (querySearchRegionId !== searchRegionId) {
      if (searchRegionId) {
        searchParams.set(QueryEnum.SearchRegionId, searchRegionId.toString());
      } else {
        searchParams.delete(QueryEnum.SearchRegionId);
      }
      isNeedToUpdateSearchParams = true;
    }
    if (querySearchLocationId !== searchLocationId) {
      if (searchLocationId) {
        searchParams.set(QueryEnum.SearchLocationId, searchLocationId.toString());
      } else {
        searchParams.delete(QueryEnum.SearchLocationId);
      }
      isNeedToUpdateSearchParams = true;
    }
    if (isNeedToUpdateSearchParams) {
      setSearchParams(searchParams);
    }
  }, [searchRegionId, searchLocationId, searchParams, setSearchParams]);

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
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchLocationSelector;
