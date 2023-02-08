import { AddressType, ManufacturerType, OptionsType, ProductType, QueryEnum } from '../types/types';
import { WEIGHT_ONE_CUBIC_METER_OF_WOOD } from './constants';
import { CloseDetailCardType } from '../components/DetailProductCard/DetailProductCard';
import { toggleProductForBasketThunk } from '../store/basketSlice';
import { AppDispatch } from '../store/store';

export function clearFormAfterSubmit(myFormElement: HTMLFormElement) {
  const elements = myFormElement.elements;
  for (let i = 0; i < elements.length; i++) {
    if (elements[i] instanceof HTMLInputElement) {
      const input = elements[i] as HTMLInputElement;
      switch (input.type) {
        case 'text':
        case 'password':
        case 'textarea':
        case 'hidden':
          input.value = '';
          break;

        case 'radio':
        case 'checkbox':
          if (input.checked) {
            input.checked = false;
          }
          break;

        case 'select-one':
        case 'select-multi':
          (input as unknown as HTMLSelectElement).selectedIndex = -1;
          break;

        default:
          break;
      }
    }
  }
}

export const getOptionsWithFirstEmptyOption = (optionsStore: OptionsType[], emptyOptionTitle?: string) => {
  const options: OptionsType[] = [];
  if (optionsStore.length > 0) {
    options.push({ id: 0, title: emptyOptionTitle ? emptyOptionTitle : '' });
    options.push(...optionsStore);
  } else {
    options.push({ id: 0, title: '' });
  }
  return options;
};

export const getInputFormData = (form: HTMLFormElement, name: string): string => {
  const element = form.elements.namedItem(name);
  if (element instanceof HTMLInputElement) {
    return element.value;
  }
  return '';
};

export const isFiltersSearchParams = (searchParams: URLSearchParams) => {
  const searchParamsClone = new URLSearchParams(searchParams.toString());
  searchParamsClone.delete(QueryEnum.SearchRegionId);
  searchParamsClone.delete(QueryEnum.SearchLocationId);
  return !!searchParamsClone.toString().length;
};

export const checkIsShowFilterSelectors = (searchParams: URLSearchParams) => {
  const searchParamsClone = new URLSearchParams(searchParams.toString());
  searchParamsClone.delete(QueryEnum.SearchRegionId);
  searchParamsClone.delete(QueryEnum.SearchLocationId);
  searchParamsClone.delete(QueryEnum.ManufacturerId);
  searchParamsClone.delete(QueryEnum.SortDirection);
  return searchParamsClone.toString().length > 0;
};

export const checkIsShowFiltersRow = (searchParams: URLSearchParams) => {
  const searchParamsClone = new URLSearchParams(searchParams.toString());
  const searchRegionId = searchParamsClone.get(QueryEnum.SearchRegionId);
  if (!searchRegionId) {
    searchParamsClone.delete(QueryEnum.SearchRegionId);
  }
  const searchLocationId = searchParamsClone.get(QueryEnum.SearchLocationId);
  if (!searchLocationId) {
    searchParamsClone.delete(QueryEnum.SearchLocationId);
  }
  searchParamsClone.delete(QueryEnum.ManufacturerId);
  searchParamsClone.delete(QueryEnum.SortDirection);
  return searchParamsClone.toString().length > 0;
};

export const getOptionTitle = (options: OptionsType[], optionId: number | undefined) => {
  if (optionId) {
    const option = options.find((option) => option.id === optionId);
    if (option?.title) {
      return option.title;
    }
  }
  return undefined;
};

export const formatPrice = (price: string | number | undefined) => {
  if (price === 0) {
    return '0.00';
  }
  if (price) {
    const splitPrice = String((Math.round(Number(price) * 100) / 100).toFixed(2)).split('.');
    return `${splitPrice[0]}.${splitPrice[1]}`.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }
  return '';
};

export const getWeight = (volume: number | undefined) => {
  if (!volume) {
    return 0;
  }
  return WEIGHT_ONE_CUBIC_METER_OF_WOOD * volume;
};

export const getSquare = ({ width, length }: { width: number | undefined; length: number | undefined }) => {
  if (!width || !length) {
    return 0;
  }
  return (width * length) / 1000000;
};

export const getPriceForSquareMeter = ({
  width,
  length,
  price,
}: {
  width: number | undefined;
  length: number | undefined;
  price: number | undefined;
}) => {
  const square = getSquare({ width, length });
  if (!square || !price) {
    return undefined;
  }
  return (1 / square) * price;
};

export const getVolume = ({
  height,
  width,
  length,
}: {
  height: number | undefined;
  width: number | undefined;
  length: number | undefined;
}) => {
  if (!height || !width || !length) {
    return 0;
  }
  return (width * length * height) / 1000000000;
};

export const getPriceForCubicMeter = ({
  height,
  width,
  length,
  price,
}: {
  height: number | undefined;
  width: number | undefined;
  length: number | undefined;
  price: number | undefined;
}) => {
  const volume = getVolume({ height, width, length });
  if (!volume || !price) {
    return undefined;
  }
  return (1 / volume) * price;
};

export const getVolumeCaliber = ({ caliber, length }: { caliber: number | undefined; length: number | undefined }) => {
  if (!caliber || !length) {
    return 0;
  }
  // (hмм*Π*dмм2/4)/1 000 000 000
  return (length * Math.PI * (caliber * caliber)) / 4 / 1000000000;
};

export const getPriceForCubicMeterCaliber = ({
  caliber,
  length,
  price,
}: {
  caliber: number | undefined;
  length: number | undefined;
  price: number | undefined;
}) => {
  const volumeCaliber = getVolumeCaliber({ caliber, length });
  if (!volumeCaliber || !price) {
    return undefined;
  }
  return (1 / volumeCaliber) * price;
};

export const getSizesValue = (product: ProductType) => {
  const height = Number(product.height);
  const width = Number(product.width);
  const length = Number(product.length);
  const caliber = Number(product.caliber);
  return { height, width, length, caliber };
};

export const checkIsManufacturerPage = (location: { pathname: string }) => location?.pathname?.includes('manufacturer');

export const getBackwardRouteToManufacturerCatalog = (
  userManufacturerId?: number,
  catalogSearchParams?: URLSearchParams
) => {
  if (catalogSearchParams) {
    return `/manufacturer/?${catalogSearchParams}`;
  } else if (userManufacturerId) {
    return `/manufacturer/?mid=${userManufacturerId}`;
  }
  return `/`;
};

export const getProductSizesStr = (product: ProductType | undefined) => {
  let sizes = '';
  if (product) {
    if (product.caliber) {
      sizes += product.caliber;
    } else {
      if (product.height) {
        sizes += product.height;
      }
      if (product.width) {
        sizes += `*${product.width}`;
      }
    }
    if (product.length) {
      sizes += `*${product.length}`;
    }
  }
  return sizes;
};

export const onCloseDetailCard = (
  { productId, isFavorite, isInBasket }: CloseDetailCardType,
  dispatch: AppDispatch,
  basketProducts: ProductType[]
) => {
  const basketProductIds = basketProducts.map((basketProduct) => basketProduct.id);
  if (basketProductIds.includes(productId)) {
    if (!isInBasket) {
      const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
      if (token) {
        dispatch(toggleProductForBasketThunk({ productId, token }));
      }
    }
  } else {
    if (isInBasket) {
      const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
      if (token) {
        dispatch(toggleProductForBasketThunk({ productId, token }));
      }
    }
  }
};

export const getLogisticInfo = (product: ProductType, rawAmount?: number) => {
  const { height, width, length, caliber } = getSizesValue(product);
  let square: number | undefined;
  let volume: number | undefined;
  let weight: number | undefined;
  let summ: number | undefined;

  let amount: number = rawAmount
    ? rawAmount
    : product.amountInBasket
    ? Number(product.amountInBasket)
    : product.amountInOrder
    ? Number(product.amountInOrder)
    : product.amountInConfirmation
    ? Number(product.amountInConfirmation)
    : product.divergenceAmount
    ? Number(product.divergenceAmount)
    : 0;

  if (caliber) {
    volume = getVolumeCaliber({ caliber, length }) * amount;
    weight = getWeight(volume) * amount;
  } else {
    square = getSquare({ width, length }) * amount;
    const volumeItem = getVolume({ height, width, length });
    volume = volumeItem * amount;
    weight = getWeight(volumeItem) * amount;
  }
  summ = !isNaN(Number(product.price)) ? Number(product.price) * amount : 0;
  return { square, weight, volume, cost: summ };
};

export const toStrWithDelimiter = (value: number | string) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

export const getTotalLogisticInfo = (products: ProductType[]) => {
  let totalWeight = 0;
  let totalVolume = 0;
  let totalCost = 0;
  products.forEach((product) => {
    if (product.publicationDate) {
      const { weight, volume, cost } = getLogisticInfo(product);
      totalWeight += Number(weight);
      totalVolume += Number(volume);
      totalCost += Number(cost);
    }
  });
  return {
    totalWeight: toStrWithDelimiter(totalWeight.toFixed(1)),
    totalVolume: toStrWithDelimiter(totalVolume.toFixed(1)),
    totalCost: toStrWithDelimiter(totalCost.toFixed(2)),
  };
};

export const isAllProductAvailable = (products: ProductType[]) => {
  return !products.find((product) => product.publicationDate === undefined);
};

export const getFullStringAddress = (address: AddressType | undefined) => {
  if (address) {
    let fullAddress = '';
    fullAddress += address?.region?.title;
    if (address?.location?.title) {
      fullAddress += `, ${address?.location?.title}`;
    }
    if (address?.street) {
      fullAddress += `, ${address?.street}`;
    }
    if (address?.building) {
      fullAddress += `, ${address?.building}`;
    }
    if (address?.office) {
      fullAddress += `, ${address?.office}`;
    }
    return fullAddress;
  }
  return '';
};

export const getShortManufacturerTwoLineAddress = (manufacturer: ManufacturerType | undefined) => {
  let locationTitle = '';
  let address = '';
  if (manufacturer) {
    if (manufacturer?.address?.location?.title) {
      locationTitle = manufacturer?.address?.location?.title;
    }

    if (manufacturer?.address?.street) {
      address += `${manufacturer?.address?.street}`;
    }
    if (manufacturer?.address?.building) {
      address += `, ${manufacturer?.address?.building}`;
    }
    if (manufacturer?.address?.office) {
      address += `, ${manufacturer?.address?.office}`;
    }
  }
  return [locationTitle, address];
};

export const getSelectedOption = (optionId?: number, options?: OptionsType[]) => {
  if (optionId && optionId > 0 && !!options?.length) {
    return options.find((option) => option.id === optionId);
  } else {
    return undefined;
  }
};

export const convertOrdersStatusToServerOrdersStatus = (ordersStatus: string) => {
  if (ordersStatus === 'На подтверждении') {
    return 'onConfirming';
  } else if (ordersStatus === 'Подтвержден') {
    return 'confirmedOrder';
  } else if (ordersStatus === 'Отмена клиентом') {
    return 'canceledByUser';
  } else if (ordersStatus === 'Отказ поставщика') {
    return 'canceledByManufacturer';
  }
  return 'all';
};
