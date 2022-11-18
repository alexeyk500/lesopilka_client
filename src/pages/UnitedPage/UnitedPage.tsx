import React, { useEffect } from 'react';
import classes from './UnitedPage.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getProductsThunk, selectorProductsLoading } from '../../store/productSlice';
import { useLocation, useSearchParams } from 'react-router-dom';
import { selectorAppSearchLocationId, selectorAppSearchRegionId, selectorUser } from '../../store/userSlice';
import { QueryEnum } from '../../types/types';
import LeftColumn from '../../components/LeftColumn/LeftColumn';
import FilterSelectors from '../MainPageOld/FilterSelectors/FilterSelectors';
import Catalog from '../../components/Catalog/Catalog';
import MainPageMainPart from '../MainPageOld/MainPageMainPart/MainPageMainPart';
import { checkFiltersSearchParams, isFiltersSearchParams } from '../../utils/functions';
import { selectorSearchLocationsByRegionId } from '../../store/addressSlice';
import Preloader from '../../components/Preloader/Preloader';

// type PropsType = {
//   isManufacturerPage?: boolean;
// }

const UnitedPage: React.FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectorProductsLoading);
  const [searchParams, setSearchParams] = useSearchParams();

  // const user = useAppSelector(selectorUser);
  // const appSearchRegionId = useAppSelector(selectorAppSearchRegionId);
  // const appSearchRLocationId = useAppSelector(selectorAppSearchLocationId);

  // const searchRegionId = user ? user?.searchRegion?.id : appSearchRegionId;
  // const searchLocationId = user ? user?.searchLocation?.id : appSearchRLocationId;

  const isManufacturerPage = location.pathname.includes('manufacturer');
  const isFiltersSearchParams = checkFiltersSearchParams(searchParams);

  // useEffect(()=>{
  //   let isNeedUpdateSearchParams = false;
  //   if (isManufacturerPage && user?.manufacturer?.id) {
  //     searchParams.set(QueryEnum.ManufacturerId, user.manufacturer.id.toString())
  //     isNeedUpdateSearchParams = true
  //   }
  //   if (searchRegionId) {
  //     searchParams.set(QueryEnum.SearchRegionId, searchRegionId.toString())
  //     isNeedUpdateSearchParams = true
  //   }
  //   if (searchLocationId) {
  //     searchParams.set(QueryEnum.SearchRegionId, searchLocationId.toString())
  //     isNeedUpdateSearchParams = true
  //   }
  //   isNeedUpdateSearchParams && setSearchParams(searchParams)
  // },[user])

  // useEffect(() => {
  //   console.log('dispatch(getProductsThunk(searchParams)) =', searchParams.toString());
  //   searchParams && dispatch(getProductsThunk(searchParams));
  // }, [dispatch, searchParams]);

  useEffect(() => {
    console.log('dispatch(getProductsThunk()) =');
    searchParams && dispatch(getProductsThunk());
  }, [dispatch]);

  const onClickCatalogCategory = (id: number) => {
    if (id) {
      searchParams.set(QueryEnum.CatalogCategory, id.toString());
      setSearchParams(searchParams);
    }
  };

  return (
    <div className={classes.container}>
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <LeftColumn>
            {isFiltersSearchParams ? <FilterSelectors /> : <Catalog onClickCatalogCategory={onClickCatalogCategory} />}
          </LeftColumn>
          <MainPageMainPart />
        </>
      )}
    </div>
  );
};

export default UnitedPage;
