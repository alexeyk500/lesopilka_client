import React from 'react';
import classes from './MainPage.module.css';
import Catalog from '../../components/Catalog/Catalog';
import { useAppSelector } from '../../hooks/hooks';
import { selectorCatalogIsLoading } from '../../store/catalogSlice';
import Preloader from '../../components/Preloader/Preloader';
import LeftColumn from '../../components/LeftColumn/LeftColumn';
import RightColumn from '../../components/RightColumn/RightColumn';
import FiltersRow from './FiltersRow/FiltersRow';
import ProductList from './ProductList/ProductList';
import SelectRow from './SelectRow/SelectRow';
import { selectorFilters } from '../../store/productSlice';
import { getValueFromFilter } from '../../utils/functions';
import FilterSelectors from './FilterSelectors/FilterSelectors';

const MainPage: React.FC = () => {
  const isLoading = useAppSelector(selectorCatalogIsLoading);
  const filters = useAppSelector(selectorFilters);
  const categoryId = getValueFromFilter(filters, 'categoryId');

  return (
    <div className={classes.container}>
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <LeftColumn>{categoryId ? <FilterSelectors /> : <Catalog />}</LeftColumn>
          <RightColumn>
            <>
              {categoryId && <FiltersRow />}
              {categoryId && <SelectRow />}
              <ProductList />
            </>
          </RightColumn>
        </>
      )}
    </div>
  );
};

export default MainPage;
