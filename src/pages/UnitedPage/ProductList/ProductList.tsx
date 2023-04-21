import React, { useCallback, useRef } from 'react';
import classes from './ProductList.module.css';
import ProductCard from '../../../components/ProductCard/ProductCard';
import { checkIsManufacturerPage, isFiltersSearchParams } from '../../../utils/functions';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import {
  addProductsThunk,
  createProductThunk,
  selectorCurrentPage,
  selectorProductsAdding,
  selectorProductsLoading,
  selectorTotalPages,
  setCatalogSearchParams,
} from '../../../store/productSlice';
import Preloader from '../../../components/Preloader/Preloader';
import SelectRow from '../SelectRow/SelectRow';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { ProductType, QueryEnum } from '../../../types/types';
import { PageEnum } from '../../../components/AppRouter/AppRouter';
import { selectorProducts } from '../../../store/productsCombineSelector';
import ProductListItem from './ProductListItem/ProductListItem';

const ProductList = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const products = useAppSelector(selectorProducts);
  const isLoading = useAppSelector(selectorProductsLoading);
  const currentPageStore = useAppSelector(selectorCurrentPage);
  const totalPagesStore = useAppSelector(selectorTotalPages);
  const isAddingProducts = useAppSelector(selectorProductsAdding);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isSearchParams = isFiltersSearchParams(searchParams);
  const isManufacturerPage = checkIsManufacturerPage(location);

  const onClickAddProductCard = () => {
    const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
    if (token) {
      dispatch(createProductThunk(token)).then((result) => {
        if ((result as { type: string }).type.includes('fulfilled')) {
          const id = (result.payload as ProductType).id;
          dispatch(setCatalogSearchParams(searchParams.toString()));
          navigate(`${PageEnum.EditProduct}/${id}`);
        }
      });
    }
  };

  const observer = useRef<IntersectionObserver>();

  const getMoreProducts = useCallback(() => {
    let currentPage = currentPageStore;
    if (totalPagesStore && totalPagesStore > currentPage + 1) {
      const newCurrentPage = currentPage + 1;
      const searchParamsClone = new URLSearchParams(searchParams.toString());
      searchParamsClone.set(QueryEnum.CurrentPage, newCurrentPage.toString());
      dispatch(addProductsThunk(searchParamsClone));
    }
  }, [dispatch, currentPageStore, searchParams, totalPagesStore]);

  const lastProductRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) {
        return;
      }
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0]?.isIntersecting) {
          getMoreProducts();
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [isLoading, getMoreProducts]
  );

  return (
    <div className={classes.container}>
      <div className={classes.filtersRowContainer}>{isSearchParams && <SelectRow />}</div>
      <div className={classes.scrollContainer}>
        {isLoading ? (
          <div className={classes.preloaderContainer}>
            <Preloader />
          </div>
        ) : (
          <>
            {isManufacturerPage && <ProductCard isAddProductCard onClick={onClickAddProductCard} />}
            {products.length > 0
              ? products.map((product, index) => {
                  if (index === products.length - 1) {
                    return (
                      <div ref={lastProductRef} key={index + 'div'}>
                        <ProductListItem key={index} product={product} isManufacturerPage={isManufacturerPage} />
                      </div>
                    );
                  } else {
                    return <ProductListItem key={index} product={product} isManufacturerPage={isManufacturerPage} />;
                  }
                })
              : !isManufacturerPage && (
                  <div className={classes.noProductsContainer}>
                    {'Товары c такими параметрами не найдены,\nизмените параметры поиска.'}
                  </div>
                )}
            {isAddingProducts && <div className={classes.isAddingProductsTitle}>Подождите идет загрузка ...</div>}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductList;
