import React, { useEffect } from 'react';
import { AmountTypeEnum, OrderType, ProductType } from '../../../../../../types/types';
import classes from './ManOrderProductsList.module.css';
import OrderProductsList from '../../../../../BasketPage/BasketPageMainPart/BasketList/OrderToManufacturer/OrderProductsList/OrderProductsList';
import { getIsArchivedOrder } from '../../../../../../utils/ordersFunctions';

type PropsType = {
  order: OrderType;
  products: ProductType[];
  amountType: AmountTypeEnum;
  setConfirmationProducts?: (products: ProductType[] | undefined) => void;
  confirmationProducts?: ProductType[];
};

const ManOrderProductsList: React.FC<PropsType> = ({
  order,
  products,
  amountType,
  setConfirmationProducts,
  confirmationProducts,
}) => {
  const isConfirmedOrder = !!order.order.manufacturerConfirmedDate;
  const isConfirmationTab = amountType === AmountTypeEnum.inConfirmation;
  const isArchivedOrder = getIsArchivedOrder(order);

  const isSetConfirmationProducts =
    isConfirmationTab && !isConfirmedOrder && !isArchivedOrder && setConfirmationProducts && !confirmationProducts;

  useEffect(() => {
    if (isSetConfirmationProducts) {
      const transformedProducts = products.map((product) => {
        return { ...product, amountInConfirmation: product.amountInOrder, amountInDivergence: 0 };
      });
      setConfirmationProducts(transformedProducts);
    }
  }, [products, setConfirmationProducts, isSetConfirmationProducts]);

  const updateProductConfirmationAmount = (product: ProductType, newAmount: number) => {
    const newConfirmationProducts = confirmationProducts?.map((curProduct) => {
      if (curProduct.id === product.id) {
        const divergence = product.amountInOrder ? newAmount - product.amountInOrder : -newAmount;
        return {
          ...curProduct,
          amountInConfirmation: newAmount,
          amountInDivergence: divergence,
        };
      } else {
        return curProduct;
      }
    });
    setConfirmationProducts && setConfirmationProducts(newConfirmationProducts);
  };

  return (
    <div className={classes.container}>
      {isConfirmedOrder || isArchivedOrder || !isConfirmationTab ? (
        <OrderProductsList products={products} amountType={amountType} />
      ) : (
        confirmationProducts && (
          <OrderProductsList
            products={confirmationProducts}
            amountType={amountType}
            updateProductConfirmationAmount={updateProductConfirmationAmount}
          />
        )
      )}
    </div>
  );
};

export default ManOrderProductsList;
