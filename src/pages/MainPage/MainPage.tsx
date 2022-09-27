import React from 'react';
import classes from './MainPage.module.css';
import Catalog from '../../components/Catalog/Catalog';

const MainPage: React.FC = () => {
  return (
    <div className={classes.container}>
      <Catalog />
    </div>
  );
};

export default MainPage;
