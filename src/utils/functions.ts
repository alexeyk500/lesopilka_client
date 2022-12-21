import { CategorySizeType, OptionsType, ProductType, QueryEnum, SizeTypeEnum, UserType } from '../types/types';
import { WEIGHT_ONE_CUBIC_METER_OF_WOOD } from './constants';
import {CloseDetailCardType} from "../components/DetailProductCard/DetailProductCard";
import {toggleProductForBasketThunk} from "../store/basketSlice";

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

export const getOptionsWithFirstEmptyOption = (optionsStore: OptionsType[]) => {
  const options: OptionsType[] = [];
  options.push({ id: 0, title: '' });
  options.push(...optionsStore);
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
  if (price) {
    const splitPrice = String((Math.round(Number(price) * 100) / 100).toFixed(2)).split('.');
    return `${splitPrice[0]}.${splitPrice[1]}`;
  }
  return '';
};

export const getWeight = (volume: string | number | undefined) => {
  const volumeNumber = Number(volume);
  if (!volumeNumber) {
    return undefined;
  }
  const weight = WEIGHT_ONE_CUBIC_METER_OF_WOOD * volumeNumber;
  if (weight < 10) {
    return weight.toFixed(1);
  }
  return weight.toFixed(0);
};

export const getSquare = ({
  width,
  length,
}: {
  width: string | number | undefined;
  length: string | number | undefined;
}) => {
  const widthNumber = Number(width);
  const lengthNumber = Number(length);
  if (!widthNumber || !lengthNumber) {
    return undefined;
  }
  return ((widthNumber * lengthNumber) / 1000000).toFixed(2);
};

export const getPriceForSquareMeter = ({
  width,
  length,
  price,
}: {
  width: string | undefined;
  length: string | undefined;
  price: string | undefined;
}) => {
  const square = getSquare({ width, length });
  const squareNumber = Number(square);
  const priceNumber = Number(price);
  if (!squareNumber || !priceNumber) {
    return undefined;
  }
  return ((1 / squareNumber) * priceNumber).toFixed(2);
};

export const getVolume = ({
  height,
  width,
  length,
}: {
  height: string | undefined;
  width: string | undefined;
  length: string | undefined;
}) => {
  const heightNumber = Number(height);
  const widthNumber = Number(width);
  const lengthNumber = Number(length);
  if (!heightNumber || !widthNumber || !lengthNumber) {
    return undefined;
  }
  return ((widthNumber * lengthNumber * heightNumber) / 1000000000).toFixed(2);
};

export const getPriceForCubicMeter = ({
  height,
  width,
  length,
  price,
}: {
  height: string | undefined;
  width: string | undefined;
  length: string | undefined;
  price: string | undefined;
}) => {
  const volume = getVolume({ height, width, length });
  const volumeNumber = Number(volume);
  const priceNumber = Number(price);
  if (!volumeNumber || !priceNumber) {
    return undefined;
  }
  return ((1 / volumeNumber) * priceNumber).toFixed(2);
};

export const getVolumeCaliber = ({ caliber, length }: { caliber: string | undefined; length: string | undefined }) => {
  const caliberNumber = Number(caliber);
  const lengthNumber = Number(length);
  if (!caliberNumber || !lengthNumber) {
    return undefined;
  }
  // (hмм*Π*dмм2/4)/1 000 000 000
  return ((lengthNumber * Math.PI * (caliberNumber * caliberNumber)) / 4 / 1000000000).toFixed(2);
};

export const getPriceForCubicMeterCaliber = ({
  caliber,
  length,
  price,
}: {
  caliber: string | undefined;
  length: string | undefined;
  price: string | undefined;
}) => {
  const volumeCaliber = getVolumeCaliber({ caliber, length });
  const volumeCaliberNumber = Number(volumeCaliber);
  const priceNumber = Number(price);
  if (!volumeCaliberNumber || !priceNumber) {
    return undefined;
  }
  return ((1 / volumeCaliberNumber) * priceNumber).toFixed(2);
};

export const getSizesValue = (product: ProductType) => {
  const height = product.height;
  const width = product.width;
  const length = product.length;
  const caliber = product.caliber;
  return { height, width, length, caliber };
};

export const getSizeBySizeType = (sizeType: SizeTypeEnum, sizes?: CategorySizeType[]) => {
  const size = sizes?.find((size) => size.type === sizeType);
  if (size) {
    return size.value;
  }
  return undefined;
};

export const formatUTC = (utcData: string | undefined) => {
  if (utcData) {
    return new Date(utcData).toLocaleString('ru-Ru', {
      month: 'long',
      year: 'numeric',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  }
  return null;
};

export const makeFirstSearchParams = (user?: UserType, searchRegionId?: number, searchLocationId?: number) => {
  const searchParams = new URLSearchParams();
  if (user?.manufacturer?.id) {
    searchParams.set(QueryEnum.ManufacturerId, user.manufacturer.id.toString());
  }
  if (searchRegionId) {
    searchParams.set(QueryEnum.SearchRegionId, searchRegionId.toString());
  }
  if (searchLocationId) {
    searchParams.set(QueryEnum.SearchLocationId, searchLocationId.toString());
  }
  const searchParamsStr = searchParams.toString();
  if (!!searchParamsStr.length) {
    return `?${searchParamsStr}`;
  }
  return '';
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

export const onCloseDetailCard =({productId, isFavorite, isInBasket}: CloseDetailCardType, dispatch: any, basketProducts: ProductType[]) => {
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
}
