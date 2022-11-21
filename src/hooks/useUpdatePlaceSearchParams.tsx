import { useAppSelector } from './hooks';
import { selectorSearchLocationId, selectorSearchRegionId } from '../store/userSlice';
import { QueryEnum } from '../types/types';

export default function useUpdatePlaceSearchParams(searchParams: URLSearchParams): URLSearchParams {
  const searchRegionId = useAppSelector(selectorSearchRegionId);
  const searchLocationId = useAppSelector(selectorSearchLocationId);
  if (searchRegionId) {
    searchParams.set(QueryEnum.SearchRegionId, searchRegionId.toString());
  } else {
    searchParams.set(QueryEnum.SearchRegionId, '');
  }
  if (searchLocationId) {
    searchParams.set(QueryEnum.SearchLocationId, searchLocationId.toString());
  } else {
    searchParams.set(QueryEnum.SearchLocationId, '');
  }
  return searchParams;
}
