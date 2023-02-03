import { DriedEnum, SepticEnum } from '../types/types';

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

export const MAX_MONTH_SHIFT_FOR_ORDERS = 1;

export const SHOW_TOOLTIP_TIMEOUT = 500;
