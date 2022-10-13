export type SelectOptionsType = {
  id: number | undefined;
  title: string;
};

export type ManufacturerType = {
  title: string;
  location: string;
};

export type UserType = {
  name: string;
  email: string;
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

export type NewCardType = {
  categoryId: number | undefined;
  subCategoryId: number | undefined;
  productMaterialId: number | undefined;
  productCode: string | undefined;
  images: string[];
  heightId: number | undefined;
  customHeight: string | undefined;
  widthId: number | undefined;
  customWidth: string | undefined;
  lengthId: number | undefined;
  customLength: string | undefined;
  caliberId: number | undefined;
  customCaliber: string | undefined;
  sortId: number | undefined;
  isSeptic: boolean;
  description: string | undefined;
  price: string | undefined;
};

export type ProductCardDataType = {
  manufacturer: ManufacturerType;
  subCategoryTile: string;
  material: string;
  sort: string;
  isSeptic: boolean;
  image: string | undefined;
  width: string | undefined;
  height: string | undefined;
  caliber: string | undefined;
  length: string;
  price: string;
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
  isCustomSize: boolean;
  order: number;
  categoryId: number;
};

export type ProductSortsType = {
  id: number;
  title: string;
};

export type CrumbType = {
  title: string;
  route?: string;
};
