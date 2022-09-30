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
  widthId: string | undefined;
  lengthId: string | undefined;
  sortId: string | undefined;
  antisepticId: boolean | undefined;
  description: string | undefined;
  price: string | undefined;
};

export type ProductMaterialType = {
  id: string;
  material: string;
  isPine: boolean;
  order: number;
};
