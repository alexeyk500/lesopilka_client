export type SelectOptionsType = {
  id: string | undefined;
  title: string;
};

export type UserType = {
  name: string;
  email: string;
};

export type CategoryType = {
  id: string;
  title: string;
  image: string;
  order: number;
};

export type SubCategoryType = {
  id: string;
  title: string;
  order: number;
  categoryId: string;
};

export type CardType = {
  categoryId: string | undefined;
  subCategoryId: string | undefined;
  productMaterialId: string | undefined;
  productCode: string | undefined;
  images: string[];
  heightId: string | undefined;
  customHeight: string | undefined;
  widthId: string | undefined;
  customWidth: string | undefined;
  lengthId: string | undefined;
  customLength: string | undefined;
  caliberId: string | undefined;
  customCaliber: string | undefined;
  sortId: string | undefined;
  antisepticId: boolean | undefined;
  description: string | undefined;
  price: string | undefined;
};

export type ProductMaterialType = {
  id: string;
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
  id: string;
  type: string;
  value: number;
  isCustomSize: boolean;
  order: number;
  categoryId: string;
};
