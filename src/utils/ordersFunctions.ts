import { OrderStatusEnum, OrderType, ProductType } from '../types/types';
import { getOrderStatusEnumValue } from '../pages/OrdersPage/OrdersPageMain/OrdersList/OrderItem/OrderStatus/OrderStatus';

export const checkIsDivergenceByProductId = (productId?: number, order?: OrderType) => {
  if (order && productId) {
    const orderProduct = order.products.find((product) => product.id === productId);
    const confirmedProduct = order.confirmedProducts?.find((product) => product.confirmedProductId === productId);
    if (orderProduct && confirmedProduct) {
      if (orderProduct.amountInOrder !== confirmedProduct.amountInConfirmation) {
        if (
          typeof orderProduct.amountInOrder !== 'undefined' &&
          typeof confirmedProduct.amountInConfirmation !== 'undefined'
        ) {
          const divergence = orderProduct.amountInOrder - confirmedProduct.amountInConfirmation;
          if (divergence > 0) {
            return divergence;
          }
          return true;
        }
      }
    }
  }
  return false;
};

export const checkIsDivergenceInOrder = (order: OrderType) => {
  if (order.products.length > 0) {
    let i = 0;
    while (i < order.products.length) {
      const isProductDivergence = checkIsDivergenceByProductId(order.products[i].id, order);
      if (isProductDivergence) {
        return true;
      }
      i = i + 1;
    }
  }
  return false;
};

export const getOrderDetailHeader = ({
  orderId,
  date,
  isConfirmation,
  isDivergence,
}: {
  orderId: number;
  date: string;
  isConfirmation?: boolean;
  isDivergence?: boolean;
}) => {
  let firstLine = 'Ваш заказ поставщику';
  if (isConfirmation) {
    firstLine = 'Подтвержденние заказа от поставщика';
  } else if (isDivergence) {
    firstLine = 'Расхождения в подтвержденным заказе';
  }
  return firstLine + `\nЗаказ № ${orderId} на ${date}`;
};

export const checkIsPossibleToCancelOrder = (orderStatus: OrderStatusEnum) => {
  if (getOrderStatusEnumValue(orderStatus) === OrderStatusEnum.onConfirming) {
    return true;
  } else if (getOrderStatusEnumValue(orderStatus) === OrderStatusEnum.onPaymentWaiting) {
    return true;
  }
  return false;
};

export const getProductDivergence = (order: OrderType) => {
  const divergentProducts: ProductType[] = [];
  order.products.forEach((product) => {
    const confirmedProduct = order.confirmedProducts?.find(
      (confirmedProduct) => confirmedProduct.confirmedProductId === product.id
    );
    if (
      confirmedProduct &&
      product.amountInOrder !== undefined &&
      confirmedProduct.amountInConfirmation !== undefined
    ) {
      const divergenceAmount = product.amountInOrder - confirmedProduct.amountInConfirmation;
      if (divergenceAmount > 0) {
        divergentProducts.push({ ...product, amountInOrder: undefined, divergenceAmount });
      }
    }
  });
  return divergentProducts;
};
