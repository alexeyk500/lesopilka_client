import { DriedEnum, OptionsType, OrderViewEnum, SepticEnum } from '../types/types';

export const HELP_DESK_EMAIL = 'lesopilka-support@yandex.ru';

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

export const MAX_MESSAGE_LENGTH = 1000;

export const WEIGHT_ONE_CUBIC_METER_OF_WOOD = 550;

export const PRODUCTS_PAGE_SIZE = 32;

export const MAX_BASKET_PRODUCT_AMOUNT = 10000;

export const SHOW_TOOLTIP_TIMEOUT = 500;
export const HIDE_TOOLTIP_TIMEOUT = 1000;

export const MIN_MONTH_SHIFT_FOR_USER_ORDERS = -2;
export const MAX_MONTH_SHIFT_FOR_USER_ORDERS = 1;

export const MIN_MONTH_SHIFT_FOR_MANUFACTURER_ORDERS = -4;
export const MAX_MONTH_SHIFT_FOR_MANUFACTURER_ORDERS = 1;

export const MONTH_SHIFT_FOR_MANUFACTURER_LICENSE = -3;

export const WELCOME_LICENSES_AMOUNT = 500;

export const RESELLER_MANUFACTURER_STATUS_ATTENTION_DAYS = 7;

export const orderStatusOptions: OptionsType[] = [
  { id: 0, title: OrderViewEnum.active, toolTip: '' },
  { id: 1, title: OrderViewEnum.onConfirming, toolTip: '' },
  { id: 2, title: OrderViewEnum.confirmedOrder, toolTip: '' },
  { id: 3, title: OrderViewEnum.canceledByUser, toolTip: '' },
  { id: 4, title: OrderViewEnum.canceledByManufacturer, toolTip: '' },
  { id: 5, title: OrderViewEnum.inArchive, toolTip: '' },
  { id: 6, title: OrderViewEnum.all, toolTip: '' },
];

export const userOrderStatusOptionsToolTips: string[] = [
  'Ваши заказы c датой поставки менее 30 дней',
  'Заказы еще на рассмотрении у поставщика',
  'Поставщик готов поставить вам эти заказы',
  'Вы отменили эти заказы',
  'Поставщик не готов поставить вам эти заказы',
  'Заказы c датой поставки старше 30 дней, а так же заказы убранные в архив',
  'Все ваши заказы',
];

export const manufacturerOrderStatusOptionsToolTips: string[] = [
  'Заказы c датой поставки менее 30 дней',
  'Заказы которые находятся у вас на рассмотрении',
  'Вы подтвердили готовность поставить эти заказы',
  'Покупатель отменил эти заказы',
  'Вы отказались поставлять эти заказы',
  'Заказы c датой поставки старше 30 дней, а так же заказы убранные в архив',
  'Все заказы от ваших покупателей',
];
