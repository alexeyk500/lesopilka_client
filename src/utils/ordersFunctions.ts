import {
  AmountTypeEnum,
  OrderStatusEnum,
  OrderType,
  OrderViewEnum,
  ProductType,
  ServerDeliveryMethodEnum,
} from '../types/types';
import { formatPrice } from './functions';

type GetOrderDetailHeaderParamsType = {
  orderId: number;
  date: string;
  infoTab: AmountTypeEnum;
};

export const getOrderDetailHeader = ({ orderId, date, infoTab }: GetOrderDetailHeaderParamsType) => {
  if (infoTab === AmountTypeEnum.inConfirmation) {
    return `Подтверждение по заказу № ${orderId} на ${date}`;
  } else if (infoTab === AmountTypeEnum.inDivergence) {
    return `Расхождения по заказу № ${orderId} на ${date}`;
  }
  return `Заказ № ${orderId} на ${date}`;
};

export const getIsDeliveryMethodSelfPickUp = (order: OrderType) =>
  order.order.deliveryMethod.title === ServerDeliveryMethodEnum.selfPickUp;

export const getDeliveryTitle = (deliveryMethodTile: string, deliveryPrice?: number | null, oneRow?: boolean) => {
  if (deliveryMethodTile === ServerDeliveryMethodEnum.selfPickUp) {
    return deliveryMethodTile;
  }
  if (deliveryMethodTile === ServerDeliveryMethodEnum.delivery) {
    if (deliveryPrice !== undefined) {
      if (deliveryPrice === null) {
        return oneRow
          ? `${deliveryMethodTile} силами поставщика, стоимость доставки - на подсчете у поставщика`
          : 'На подсчете';
      }
      if (deliveryPrice === 0) {
        return oneRow ? `${deliveryMethodTile} силами поставщика. Поставщик доставит заказ бесплатно` : 'Бесплатно';
      } else {
        return oneRow
          ? `${deliveryMethodTile} силами поставщика, стоимость доставки заказа - ${formatPrice(deliveryPrice)} руб.`
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

export const getIsConfirmedOrder = (order: OrderType) => !!order.order.manufacturerConfirmedDate;

export const getIsArchivedOrder = (order: OrderType) => {
  return order.order.inArchiveForUser || order.order.inArchiveForManufacturer;
};

export const getIsOrderOnConfirming = (order: OrderType) => {
  return (
    order.order.status ===
    Object.keys(OrderStatusEnum)[Object.values(OrderStatusEnum).indexOf(OrderStatusEnum.onConfirming)]
  );
};

export const getIsOrderConfirmed = (order: OrderType) => {
  return (
    order.order.status ===
    Object.keys(OrderStatusEnum)[Object.values(OrderStatusEnum).indexOf(OrderStatusEnum.confirmedOrder)]
  );
};

export const getIsOrderCanceledByUser = (order: OrderType) => {
  return (
    order.order.status ===
    Object.keys(OrderStatusEnum)[Object.values(OrderStatusEnum).indexOf(OrderStatusEnum.canceledByUser)]
  );
};

export const getIsOrderCanceledManufacturer = (order: OrderType) => {
  return (
    order.order.status ===
    Object.keys(OrderStatusEnum)[Object.values(OrderStatusEnum).indexOf(OrderStatusEnum.canceledByManufacturer)]
  );
};

export const getIsConfirmationTab = (amountType: AmountTypeEnum) => amountType === AmountTypeEnum.inConfirmation;

export const convertOrdersViewToServerOrdersStatus = (orderView: string) => {
  if (orderView === OrderViewEnum.active) {
    return 'active';
  } else if (orderView === OrderViewEnum.onConfirming) {
    return 'onConfirming';
  } else if (orderView === OrderViewEnum.confirmedOrder) {
    return 'confirmedOrder';
  } else if (orderView === OrderViewEnum.canceledByUser) {
    return 'canceledByUser';
  } else if (orderView === OrderViewEnum.canceledByManufacturer) {
    return 'canceledByManufacturer';
  } else if (orderView === OrderViewEnum.inArchive) {
    return 'inArchive';
  }
  return 'all';
};
