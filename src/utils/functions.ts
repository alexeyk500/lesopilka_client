import {
  CategorySizeType,
  OptionsType,
  ProductCardDataType,
  ProductType,
  QueryEnum,
  SizeTypeEnum,
} from '../types/types';

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

export const isSearchParamsExceptSridAndSlid = (searchParams: URLSearchParams) => {
  const searchParamsClone = new URLSearchParams(searchParams.toString());
  searchParamsClone.delete(QueryEnum.SearchRegionId);
  searchParamsClone.delete(QueryEnum.SearchLocationId);
  return !!searchParamsClone.toString().length;
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

export const getPrice = (price: string | number | undefined) => {
  if (price) {
    const splitPrice = String((Math.round(Number(price) * 100) / 100).toFixed(2)).split('.');
    return `${splitPrice[0]}.${splitPrice[1]}`;
  }
  return '';
};

export const getSizeBySizeType = (sizeType: SizeTypeEnum, sizes?: CategorySizeType[]) => {
  const size = sizes?.find((size) => size.type === sizeType);
  if (size) {
    return size.value;
  }
  return undefined;
};

export const makeProductCardData = (product: ProductType): ProductCardDataType => {
  return {
    id: product.id,
    manufacturer: product.manufacturer,
    material: product.material ? product.material.title : '',
    sort: product.sort ? product.sort.title : '',
    subCategoryTile: product.subCategory?.title || '',
    image: product.images?.[0],
    isSeptic: product.isSeptic,
    width: getSizeBySizeType(SizeTypeEnum.width, product.sizes),
    height: getSizeBySizeType(SizeTypeEnum.height, product.sizes),
    caliber: getSizeBySizeType(SizeTypeEnum.caliber, product.sizes),
    length: getSizeBySizeType(SizeTypeEnum.length, product.sizes),
    price: getPrice(product.price ? product.price : undefined),
    editionDate: product.editionDate,
    publicationDate: product.publicationDate,
  };
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
