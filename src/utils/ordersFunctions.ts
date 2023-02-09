import { OrderStatusEnum, OrderType, ProductType, ServerDeliveryMethodEnum } from '../types/types';
import { getOrderStatusEnumValue } from '../pages/OrdersPage/OrdersPageMain/OrdersList/OrderItem/OrderStatus/OrderStatus';
import { InfoTabSelectorEnum } from '../pages/OrdersPage/OrdersPageMain/OrdersList/OrderItem/OrderDetails/InfoTabSelector/InfoTabSelector';
import { formatPrice } from './functions';

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
  infoTab,
}: {
  orderId: number;
  date: string;
  infoTab: InfoTabSelectorEnum;
}) => {
  if (infoTab === InfoTabSelectorEnum.confirmation) {
    return `Подтверждение от поставщика по Заказу № ${orderId} на ${date}`;
  } else if (infoTab === InfoTabSelectorEnum.divergence) {
    return `Расхождения по Заказу № ${orderId} на ${date}`;
  }
  return `Заказ № ${orderId} на ${date}`;
};

export const checkIsPossibleToCancelOrder = (orderStatus: OrderStatusEnum) => {
  return getOrderStatusEnumValue(orderStatus) === OrderStatusEnum.onConfirming;
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

export const getDeliveryTitle = (deliveryMethodTile: string, deliveryPrice?: number, oneRow?: boolean) => {
  if (deliveryMethodTile === ServerDeliveryMethodEnum.selfPickUp) {
    return deliveryMethodTile;
  }
  if (deliveryMethodTile === ServerDeliveryMethodEnum.delivery) {
    if (deliveryPrice !== undefined) {
      if (deliveryPrice === null) {
        return oneRow ? `${deliveryMethodTile}, стоимость доставки заказа - на подсчете у поставщика` : 'На подсчете';
      }
      if (deliveryPrice === 0) {
        return oneRow ? `${deliveryMethodTile}. Поставщик доставит вам заказ бесплатно` : 'Бесплатно';
      } else {
        return oneRow
          ? `${deliveryMethodTile}, стоимость доставки заказа - ${formatPrice(deliveryPrice)} руб.`
          : `${formatPrice(deliveryPrice)} руб.`;
      }
    }
  }
};
