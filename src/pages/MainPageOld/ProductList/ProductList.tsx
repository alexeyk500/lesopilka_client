import React from 'react';
import classes from './ProductList.module.css';
import ProductCard from '../../../components/ProductCard/ProductCard';
import {
  checkIsOnlyPlaceFiltersInSearchParams,
  isFiltersSearchParams,
  makeProductCardData,
} from '../../../utils/functions';
import { useAppSelector } from '../../../hooks/hooks';
import { selectorProducts, selectorProductsLoading } from '../../../store/productSlice';
import Preloader from '../../../components/Preloader/Preloader';
import SelectRow from '../SelectRow/SelectRow';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

const ProductList = () => {
  const products = useAppSelector(selectorProducts);
  const isLoading = useAppSelector(selectorProductsLoading);

  const [searchParams] = useSearchParams();
  const isSearchParams = isFiltersSearchParams(searchParams);

  const isOnlyPlaceFilters = checkIsOnlyPlaceFiltersInSearchParams(searchParams);

  return (
    <div className={classNames(classes.container, { [classes.containerLong]: isOnlyPlaceFilters })}>
      <div className={classes.filtersRowContainer}>{isSearchParams && <SelectRow />}</div>
      <div className={classes.scrollContainer}>
        {isLoading ? (
          <div className={classes.preloaderContainer}>
            <Preloader />
          </div>
        ) : (
          products.map((product) => (
            <ProductCard key={product.id} productCardData={makeProductCardData(product)} isManufacturerProductCard />
          ))
        )}
      </div>
    </div>
  );
};

export default ProductList;
