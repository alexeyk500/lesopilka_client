import React from 'react';
import classes from './ManOrdersPage.module.css';
import LeftColumn from '../../components/LeftColumn/LeftColumn';
import ManufacturerOrdersPageControl from './ManOrdersPageControl/ManufacturerOrdersPageControl';

const ManufacturerOrdersPage: React.FC = () => {
  return (
    <div className={classes.container}>
      <LeftColumn title={`Заказы от покупателей`}>
        <ManufacturerOrdersPageControl />
      </LeftColumn>
    </div>
  );
};

export default ManufacturerOrdersPage;
