import React, {useCallback, useEffect} from 'react';
import ButtonComponent, { ButtonType } from '../../../../components/commonComponents/ButtonComponent/ButtonComponent';
import {
  selectorAppSearchLocationId,
  selectorAppSearchRegionId,
  selectorUser, setAppSearchLocationId, setAppSearchRegionId,
  userUpdateThunk,
} from '../../../../store/userSlice';
import { getOptionTitle } from '../../../../utils/functions';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { selectorRegions, selectorSearchLocationsByRegionId } from '../../../../store/addressSlice';
import {useSearchParams} from "react-router-dom";
import {QueryEnum} from "../../../../types/types";

const FilterSearch: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectorUser);
  const regions = useAppSelector(selectorRegions);
  const appSearchRegionId = useAppSelector(selectorAppSearchRegionId);
  const appSearchRLocationId = useAppSelector(selectorAppSearchLocationId);
  const searchLocationsByRegionId = useAppSelector(selectorSearchLocationsByRegionId);
  const searchRegionId = user ? user?.searchRegion?.id : appSearchRegionId;
  const searchLocationId = user ? user?.searchLocation?.id : appSearchRLocationId;

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(()=>{
    let isNeedToUpdateSearchParams = false;
    const querySearchRegionId = Number(searchParams.get(QueryEnum.SearchRegionId));
    const querySearchLocationId = Number(searchParams.get(QueryEnum.SearchLocationId));
    if (querySearchRegionId !== searchRegionId) {
      if (searchRegionId) {
        searchParams.set(QueryEnum.SearchRegionId, searchRegionId.toString());
      } else {
        searchParams.delete(QueryEnum.SearchRegionId);
      }
      isNeedToUpdateSearchParams = true
    }
    if (querySearchLocationId !== searchLocationId) {
      if (searchLocationId) {
        searchParams.delete(QueryEnum.SearchRegionId);
        searchParams.set(QueryEnum.SearchLocationId, searchLocationId.toString());
      } else {
        searchParams.delete(QueryEnum.SearchLocationId);
      }
      isNeedToUpdateSearchParams = true
    }
    if (isNeedToUpdateSearchParams) {
      setSearchParams(searchParams);
    }
  },[searchRegionId, searchLocationId])

  const getSearchTitle = useCallback(() => {
    if (searchLocationId) {
      return getOptionTitle(searchLocationsByRegionId, searchLocationId);
    }
    if (searchRegionId) {
      return 'Регион поиска: ' + getOptionTitle(regions, searchRegionId);
    }
    return undefined;
  }, [regions, searchLocationsByRegionId, searchRegionId, searchLocationId]);

  const resetSearch = () => {
    if (searchLocationId) {
      const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
      console.log('resetSearch searchLocationId token =', token)
      if (token) {
        dispatch(userUpdateThunk({ token, searchLocationId: null }));
      } else {
        dispatch(setAppSearchLocationId(undefined));
      }
    } else {
      if (searchRegionId) {
        const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
        console.log('resetSearch searchRegionId token =', token)
        if (token) {
          dispatch(userUpdateThunk({ token, searchRegionId: null }));
        } else {
          dispatch(setAppSearchRegionId(undefined));
          dispatch(setAppSearchLocationId(undefined));
        }
      }
    }
  };

  const searchTitle = getSearchTitle();

  return (
    <>
      {searchTitle && (
        <ButtonComponent title={searchTitle || ''} buttonType={ButtonType.FILTER} onClick={resetSearch} />
      )}
    </>
  );
};

export default FilterSearch;
