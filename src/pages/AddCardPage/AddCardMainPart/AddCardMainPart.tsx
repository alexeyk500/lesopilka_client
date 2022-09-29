import React from 'react';
import classes from './AddCardMainPart.module.css';
import BreadCrumbs from '../../../components/BreadCrumbs/BreadCrumps';
import ProductDetails from './ProductDetails/ProductDetails';

const AddCardMainPart: React.FC = () => {
  return (
    <div className={classes.container}>
      <BreadCrumbs />
      <ProductDetails />
    </div>
  );
};

export default AddCardMainPart;
