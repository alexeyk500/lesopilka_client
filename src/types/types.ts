export type OptionsType = {
  id: number | undefined;
  title: string;
  key?: string;
};

export type ManufacturerType = {
  id: number;
  inn: string;
  title: string;
  phone: string;
  address: {
    id: number;
    region: RegionType;
    location: LocationType;
    street: string;
    building: string;
    office: string;
  };
};

export type UserType = {
  name: string;
  email: string;
  phone: string;
  searchRegion?: RegionType;
  searchLocation?: LocationType;
  manufacturer?: ManufacturerType;
};

export type CategoryType = {
  id: number;
  title: string;
  image: string;
  order: number;
};

export type SubCategoryType = {
  id: number;
  title: string;
  order: number;
  categoryId: number;
};

export type ProductCardType = {
  id: number;
  categoryId: number | undefined;
  subCategoryId: number | undefined;
  productMaterialId: number | undefined;
  productCode: string | undefined;
  images: string[];
  heightId: number | undefined;
  customHeightValue: string | undefined;
  widthId: number | undefined;
  customWidthValue: string | undefined;
  lengthId: number | undefined;
  customLengthValue: string | undefined;
  caliberId: number | undefined;
  customCaliberValue: string | undefined;
  sortId: number | undefined;
  isSeptic: boolean;
  description: string | undefined;
  price: string | undefined;
  editionDate: string | undefined;
  publicationDate: string | undefined;
};

export type ProductCardDataType = {
  id: number;
  manufacturer: ManufacturerType;
  subCategoryTile: string;
  material: string;
  sort: string;
  isSeptic: boolean;
  image: string | undefined;
  width: string | undefined;
  height: string | undefined;
  caliber: string | undefined;
  length: string | undefined;
  price: string;
  editionDate: string | undefined;
  publicationDate: string | undefined;
};

export type ProductMaterialType = {
  id: number;
  title: string;
  isPine: boolean;
  order: number;
};

export enum SizeTypeEnum {
  height = 'height',
  width = 'width',
  length = 'length',
  caliber = 'caliber',
}

export type CategorySizeType = {
  id: number;
  type: string;
  value: string;
  isCustomSize?: boolean;
  order?: number;
  categoryId?: number;
};

export type ProductSortsType = {
  id: number;
  title: string;
};

export type CrumbType = {
  title: string;
  route?: string;
};

export type RegionType = {
  id: number;
  title: string;
};

export type LocationType = {
  id: number;
  title: string;
};

export enum ProductsSortsEnum {
  priceASC = 'Цена по возрастанию',
  priceDESC = 'Цена по убыванию',
}

export type FilterValueType = {
  key: number;
  value: number | boolean | undefined;
};

export type FilterType = {
  title: string;
  values: FilterValueType[];
};

export type ProductType = {
  id: number;
  code: string | undefined;
  price: string | undefined;
  isSeptic: boolean;
  editionDate: string | undefined;
  publicationDate: string | undefined;
  description: string | undefined;
  category: OptionsType | undefined;
  subCategory: OptionsType | undefined;
  material: OptionsType | undefined;
  sort: OptionsType | undefined;
  sizes: CategorySizeType[] | undefined;
  images: string[] | undefined;
  manufacturer: ManufacturerType;
};
