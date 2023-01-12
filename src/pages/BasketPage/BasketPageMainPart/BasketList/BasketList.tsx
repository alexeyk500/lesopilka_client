import React from 'react';
import classes from './BasketList.module.css';

import OrderToManufacturer from './OrderToManufacturer/OrderToManufacturer';
import { ProductType } from '../../../../types/types';

type PropsType = {
  productsByManufacturer: ProductType[][];
  manufacturersRef: React.MutableRefObject<(HTMLDivElement | null)[]>;
};

const BasketList: React.FC<PropsType> = ({ productsByManufacturer, manufacturersRef }) => {
  return (
    <div className={classes.container}>
      {!!productsByManufacturer.length ? (
        <>
          <div className={classes.title}>{'Пиломатериалы по поставщикам'}</div>
          <div className={classes.scrollContainer}>
            {productsByManufacturer.map((products, ind) => {
              const getRef = (element: HTMLDivElement) => manufacturersRef.current.push(element);
              return (
                <div ref={getRef} key={ind}>
                  <OrderToManufacturer products={products} />
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className={classes.emptyBasket}>{'В вашей корзине пусто'}</div>
      )}
    </div>
  );
};

export default BasketList;
