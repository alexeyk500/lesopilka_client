import React from 'react';
import classes from './MainPage.module.css';
import Catalog from '../../components/Catalog/Catalog';
import LeftColumn from '../../components/LeftColumn/LeftColumn';
import FilterSelectors from './FilterSelectors/FilterSelectors';
import MainPageMainPart from './MainPageMainPart/MainPageMainPart';
import { useSearchParams } from 'react-router-dom';
import { QueryEnum } from '../../types/types';

const MainPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isSearchParams = !!searchParams.toString().length;

  const onClickCatalogCategory = (id: number) => {
    if (id) {
      setSearchParams({ [QueryEnum.CatalogCategory]: id.toString() }, { replace: true });
    }
  };

  return (
    <div className={classes.container}>
      <LeftColumn>
        {isSearchParams ? <FilterSelectors /> : <Catalog onClickCatalogCategory={onClickCatalogCategory} />}
      </LeftColumn>
      <MainPageMainPart />
    </div>
  );
};

export default MainPage;
