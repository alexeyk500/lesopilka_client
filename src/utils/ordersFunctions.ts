import { AmountTypeEnum, OrderStatusEnum, OrderType, ProductType, ServerDeliveryMethodEnum } from '../types/types';
import { getOrderStatusEnumValue } from '../pages/UserOrdersPage/UserOrdersPageMain/OrdersList/OrderItem/OrderStatus/OrderStatus';
import { formatPrice } from './functions';

export const getOrderDetailHeader = ({
  orderId,
  date,
  infoTab,
}: {
  orderId: number;
  date: string;
  infoTab: AmountTypeEnum;
}) => {
  if (infoTab === AmountTypeEnum.inConfirmation) {
    return `Подтверждение от поставщика по Заказу № ${orderId} на ${date}`;
  } else if (infoTab === AmountTypeEnum.inDivergence) {
    return `Расхождения по Заказу № ${orderId} на ${date}`;
  }
  return `Заказ № ${orderId} на ${date}`;
};

export const checkIsPossibleCancelOrderAndReturnToBasket = (orderStatus: OrderStatusEnum) => {
  return getOrderStatusEnumValue(orderStatus) === OrderStatusEnum.onConfirming;
};

export const getDivergenceProducts = (order: OrderType) => {
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
        divergentProducts.push({ ...product, amountInOrder: undefined, amountInDivergence: divergenceAmount });
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

export const getProductsAllAmountsType = (order: OrderType): ProductType[] => {
  const fullProducts: ProductType[] = [];
  order.products.forEach((product) => {
    const newProduct = { ...product };
    const confirmedProduct = order.confirmedProducts?.find(
      (confirmedProduct) => confirmedProduct.confirmedProductId === product.id
    );
    if (
      confirmedProduct &&
      product.amountInOrder !== undefined &&
      confirmedProduct.amountInConfirmation !== undefined
    ) {
      newProduct.amountInConfirmation = confirmedProduct.amountInConfirmation;
      newProduct.amountInDivergence = product.amountInOrder - confirmedProduct.amountInConfirmation;
    } else {
      newProduct.amountInConfirmation = undefined;
      newProduct.amountInDivergence = undefined;
    }
    fullProducts.push(newProduct);
  });
  return fullProducts;
};

export const getProductAmountByAmountType = (product: ProductType, amountType: AmountTypeEnum) => {
  if (amountType === AmountTypeEnum.inBasket) {
    return product.amountInBasket ? product.amountInBasket : 0;
  } else if (amountType === AmountTypeEnum.inOrder) {
    return product.amountInOrder ? product.amountInOrder : 0;
  } else if (amountType === AmountTypeEnum.inConfirmation) {
    return product.amountInConfirmation ? product.amountInConfirmation : 0;
  } else if (amountType === AmountTypeEnum.inDivergence) {
    return product.amountInDivergence ? product.amountInDivergence : 0;
  }
  return 0;
};
