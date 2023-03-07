import { DriedEnum, OptionsType, OrderStatusEnum, SepticEnum } from '../types/types';

export const DEBOUNCE_TIME = 1000;
export const CALIBER_PRODUCT_CATEGORIES = [6];

export const regExpForPrice = /^\d*\.?(?:\d{1,2})?$/;

export const regExpOnlyDigit = /^[0-9\b]+$/;

export const regPhone = /^\+\d{0,11}?$/;

export const SEPTIC_OPTIONS = [
  { id: 1, title: SepticEnum.noSeptic },
  { id: 2, title: SepticEnum.septic },
];

export const DRIED_OPTIONS = [
  { id: 1, title: DriedEnum.noDried },
  { id: 2, title: DriedEnum.dried },
];

export const WEIGHT_ONE_CUBIC_METER_OF_WOOD = 550;

export const PRODUCTS_PAGE_SIZE = 32;

export const MAX_BASKET_PRODUCT_AMOUNT = 10000;

export const SHOW_TOOLTIP_TIMEOUT = 500;
export const HIDE_TOOLTIP_TIMEOUT = 1000;

export const MIN_MONTH_SHIFT_FOR_USER_ORDERS = -2;
export const MAX_MONTH_SHIFT_FOR_USER_ORDERS = 1;

export const MIN_MONTH_SHIFT_FOR_MANUFACTURER_ORDERS = -4;
export const MAX_MONTH_SHIFT_FOR_MANUFACTURER_ORDERS = 1;

export const orderStatusOptions: OptionsType[] = [
  { id: 0, title: 'Все', toolTip: '' },
  { id: 1, title: OrderStatusEnum.onConfirming, toolTip: '' },
  { id: 2, title: OrderStatusEnum.confirmedOrder, toolTip: '' },
  { id: 3, title: OrderStatusEnum.canceledByUser, toolTip: '' },
  { id: 4, title: OrderStatusEnum.canceledByManufacturer, toolTip: '' },
  { id: 5, title: OrderStatusEnum.inArchive, toolTip: '' },
];

export const userOrderStatusOptionsToolTips: string[] = [
  'Все ваши заказы',
  'Заказы еще на рассмотрении у поставщика',
  'Поставщик готов поставить вам эти заказы',
  'Вы отменили эти заказы',
  'Поставщик не готов поставить вам эти заказы',
  'Заказы c датой поставки старше 30 дней',
];

export const manufacturerOrderStatusOptionsToolTips: string[] = [
  'Все заказы от покупателей',
  'Заказы которые находятся у вас на рассмотрении',
  'Вы подтвердили готовность поставить эти заказы',
  'Покупатель отменил эти заказы',
  'Вы отказались поставлять эти заказы',
  'Заказы c датой поставки старше 30 дней',
];
