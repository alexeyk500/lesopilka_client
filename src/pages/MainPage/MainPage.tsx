import React from 'react';
import classes from './MainPage.module.css';
import Catalog from '../../components/Catalog/Catalog';
import { useAppSelector } from '../../hooks/hooks';
import { selectorCatalogIsLoading } from '../../store/catalogSlice';
import Preloader from '../../components/Preloader/Preloader';
import LeftColumn from '../../components/LeftColumn/LeftColumn';

const MainPage: React.FC = () => {
  const isLoading = useAppSelector(selectorCatalogIsLoading);
  return (
    <div className={classes.container}>
      {isLoading ? (
        <Preloader />
      ) : (
        <LeftColumn>
          <Catalog />
        </LeftColumn>
      )}
    </div>
  );
};

export default MainPage;
