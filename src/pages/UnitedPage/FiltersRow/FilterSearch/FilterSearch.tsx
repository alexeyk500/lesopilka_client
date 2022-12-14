import React, { useCallback } from 'react';
import ButtonComponent, { ButtonType } from '../../../../components/commonComponents/ButtonComponent/ButtonComponent';
import {
  selectorAppSearchLocationId,
  selectorAppSearchRegionId,
  selectorUser,
  setAppSearchLocationId,
  setAppSearchRegionId,
  userUpdateThunk,
} from '../../../../store/userSlice';
import { getOptionTitle } from '../../../../utils/functions';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { selectorRegions, selectorSearchLocationsByRegionId } from '../../../../store/addressSlice';

const FilterSearch: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectorUser);
  const regions = useAppSelector(selectorRegions);
  const appSearchRegionId = useAppSelector(selectorAppSearchRegionId);
  const appSearchRLocationId = useAppSelector(selectorAppSearchLocationId);
  const searchLocationsByRegionId = useAppSelector(selectorSearchLocationsByRegionId);
  const searchRegionId = user ? user?.searchRegion?.id : appSearchRegionId;
  const searchLocationId = user ? user?.searchLocation?.id : appSearchRLocationId;

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
      if (token) {
        dispatch(userUpdateThunk({ token, searchLocationId: null }));
      } else {
        dispatch(setAppSearchLocationId(undefined));
      }
    } else {
      if (searchRegionId) {
        const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
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
