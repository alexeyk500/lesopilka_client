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
import { SizeTypeEnum } from '../../../../types/types';
import SizeSectionNew from './SizeSectionNew/SizeSectionNew';
import CatalogSection from './CatalogSection/CatalogSection';
import SizesSection from './SizesSection/SizesSection';

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
          <CatalogSection />
          <SizesSection />
          {/*<SizeSectionNew sizeType={SizeTypeEnum.height} />*/}
          {/*<SizeSectionNew sizeType={SizeTypeEnum.width} />*/}
          {/*<SizeSectionNew sizeType={SizeTypeEnum.length} />*/}
          {/*<SizeSectionNew sizeType={SizeTypeEnum.caliber} />*/}
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
