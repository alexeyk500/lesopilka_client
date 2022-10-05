import React, { useEffect } from 'react';
import classes from './ProductDetails.module.css';
import CategorySection from './CategorySection/CategorySection';
import SubCategorySection from './SubCategorySection/SubCategorySection';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import {
  getCategorySizesThunk,
  getProductMaterialsThunk,
  selectorCatalogIsLoading,
} from '../../../../store/catalogSlice';
import Preloader from '../../../../components/Preloader/Preloader';
import ProductMaterialSection from './ProductMaterialSection/ProductMaterialSection';

const ProductDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectorCatalogIsLoading);

  useEffect(() => {
    dispatch(getProductMaterialsThunk());
    dispatch(getCategorySizesThunk());
  }, [dispatch]);

  return (
    <div className={classes.container}>
      {isLoading ? (
        <div className={classes.preloaderContainer}>
          <Preloader />
        </div>
      ) : (
        <div className={classes.scrollContainer}>
          <CategorySection />
          <SubCategorySection />
          <ProductMaterialSection />
          {/*<SizeSection sizeType={SizeTypeEnum.height} />*/}
          {/*<SizeSection sizeType={SizeTypeEnum.width} />*/}
          {/*<SizeSection sizeType={SizeTypeEnum.length} />*/}
          {/*<SizeSection sizeType={SizeTypeEnum.caliber} />*/}
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
