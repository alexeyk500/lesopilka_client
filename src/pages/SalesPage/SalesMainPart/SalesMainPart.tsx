import React from 'react';
import classes from './SalesMainPart.module.css';
import SalesCardList from './SalesCardList/SalesCardList';
import BreadCrumbs from "../../../components/BreadCrumbs/BreadCrumps";

const SalesMainPart: React.FC = () => {
  return (
    <div className={classes.container}>
      <BreadCrumbs />
      <SalesCardList />
    </div>
  );
};

export default SalesMainPart;
