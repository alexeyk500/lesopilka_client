import React from 'react';
import classes from './ProductDetails.module.css';
import CheckIndicator from '../../../../components/commonComponents/CheckIndicator/CheckIndicator';

const ProductDetails: React.FC = () => {
  return (
    <div className={classes.container}>
      ProductDetails
      <div style={{ marginBottom: 32 }} />
      <CheckIndicator title={'Пиломатериал'} checked={false} />
      <div style={{ marginBottom: 32 }} />
      <CheckIndicator title={'Тип'} checked={true} />
    </div>
  );
};

export default ProductDetails;
