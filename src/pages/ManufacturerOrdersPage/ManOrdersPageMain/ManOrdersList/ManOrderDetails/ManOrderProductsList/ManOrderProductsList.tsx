import React from 'react';
import { AmountTypeEnum, OrderType, ProductType } from '../../../../../../types/types';
import classes from './ManOrderProductsList.module.css';
import OrderProductsList from '../../../../../BasketPage/BasketPageMainPart/BasketList/OrderToManufacturer/OrderProductsList/OrderProductsList';
import { getIsArchivedOrder } from '../../../../../../utils/ordersFunctions';

type PropsType = {
  order: OrderType;
  products: ProductType[];
  amountType: AmountTypeEnum;
  setConfirmationProducts?: (products: ProductType[] | undefined) => void;
  // confirmationProducts?: ProductType[];
};

const ManOrderProductsList: React.FC<PropsType> = ({ order, products, amountType, setConfirmationProducts }) => {
  const isConfirmedOrder = !!order.order.manufacturerConfirmedDate;
  const isConfirmationTab = amountType === AmountTypeEnum.inConfirmation;
  const isArchivedOrder = getIsArchivedOrder(order);

  const updateProductConfirmationAmount = (product: ProductType, newAmount: number) => {
    if (setConfirmationProducts) {
      const newConfirmationProducts = products?.map((curProduct) => {
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
      setConfirmationProducts(newConfirmationProducts);
    }
  };

  return (
    <div className={classes.container}>
      {isConfirmedOrder || isArchivedOrder || !isConfirmationTab ? (
        <OrderProductsList products={products} amountType={amountType} showAmountInput={false} />
      ) : (
        setConfirmationProducts && (
          <OrderProductsList
            products={products}
            amountType={amountType}
            updateProductConfirmationAmount={updateProductConfirmationAmount}
            showAmountInput={true}
          />
        )
      )}
    </div>
  );
};

export default ManOrderProductsList;
