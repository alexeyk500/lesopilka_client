export type SelectOptionsType = {
  id: number | undefined;
  title: string;
};

export type UserType = {
  name: string;
  email: string;
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

export type CardType = {
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
  antisepticId: number | undefined;
  description: string | undefined;
  price: string | undefined;
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
  value: number;
  isCustomSize: boolean;
  order: number;
  categoryId: number;
};

export type ProductSortsType = {
  id: number;
  title: string;
};
