import React from 'react';
import classes from './ProductList.module.css';
import ProductCard from '../../../components/ProductCard/ProductCard';
import { checkIsSalesPage, isFiltersSearchParams, makeProductCardData } from '../../../utils/functions';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import {
  createProductThunk,
  getProductThunk,
  selectorProducts,
  selectorProductsLoading,
  setCatalogSearchParams,
} from '../../../store/productSlice';
import Preloader from '../../../components/Preloader/Preloader';
import SelectRow from '../SelectRow/SelectRow';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { ProductType } from '../../../types/types';
import { showDetailProductCardPopUp } from '../../../components/DetailProductCard/DetailProductCard';
import { isFulfilled } from '@reduxjs/toolkit';

const ProductList = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const products = useAppSelector(selectorProducts);
  const isLoading = useAppSelector(selectorProductsLoading);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isSalesPage = checkIsSalesPage(location);
  const isSearchParams = isFiltersSearchParams(searchParams);

  const onClickAddProductCard = () => {
    const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
    if (token) {
      dispatch(createProductThunk(token)).then((result) => {
        if ((result as { type: string }).type.includes('fulfilled')) {
          const id = (result.payload as ProductType).id;
          dispatch(setCatalogSearchParams(searchParams.toString()));
          navigate(`/edit_card/${id}`);
        }
      });
    }
  };

  const onClick = (id: number | undefined) => {
    if (isSalesPage) {
      if (id) {
        dispatch(setCatalogSearchParams(searchParams.toString()));
        navigate(`/edit_card/${id}`);
      }
    } else {
      if (id) {
        dispatch(getProductThunk(id)).then((result) => {
          if (isFulfilled(result)) {
            showDetailProductCardPopUp(result.payload);
          }
        });
      }
    }
  };

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
            {isSalesPage && <ProductCard isAddProductCard onClick={onClickAddProductCard} />}
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard
                  key={product.id}
                  productCardData={makeProductCardData(product)}
                  onClick={onClick}
                  isManufacturerProductCard={isSalesPage}
                />
              ))
            ) : (
              <div className={classes.noProductsContainer}>
                {'Товары c такими параметрами не найдены,\nизмените параметры поиска.'}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductList;
