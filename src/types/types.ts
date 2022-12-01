export type OptionsType = {
  id: number | undefined;
  title: string;
  key?: string;
  value?: string;
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
  images: string[] | undefined;
  height: string | undefined;
  width: string | undefined;
  length: string | undefined;
  caliber: string | undefined;
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

export type ProductType = {
  id: number;
  manufacturer: ManufacturerType;
  code?: string;
  price?: string;
  isSeptic?: boolean;
  editionDate?: string;
  publicationDate?: string;
  description?: string;
  height?: string;
  width?: string;
  length?: string;
  caliber?: string;
  images?: string[];
  category?: OptionsType;
  subCategory?: OptionsType;
  material?: OptionsType;
  sort?: OptionsType;
};

export enum QueryEnum {
  CatalogCategory = 'cid',
  CatalogSubCategory = 'scid',
  SizeHeight = 'sh',
  SizeWidth = 'sw',
  SizeCaliber = 'sc',
  SizeLength = 'sl',
  SortId = 'psid',
  Septic = 'sep',
  SearchRegionId = 'srid',
  SearchLocationId = 'slid',
  ManufacturerId = 'mid',
  PriceFrom = 'pf',
  PriceTo = 'pt',
  SortDirection = 'sd',
  CurrentPage = 'page',
}

export enum QueryToSizeEnum {
  sh = 'height',
  sw = 'width',
  sc = 'caliber',
  sl = 'length',
}

export enum SepticEnum {
  septic = 'Септирован',
  noSeptic = 'Не септирован',
}

export enum SortDirectionEnum {
  PriceASC = 'pa',
  PriceDESC = 'pd',
}

export enum SortDirectionTitleEnum {
  pa = 'Цена по возрастанию',
  pd = 'Цена по убыванию',
}
