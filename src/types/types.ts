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

export type CardType = {
  categoryId: number | undefined;
  subCategoryId: number | undefined;
  productCode: string | undefined;
  photos: string[];
  heightId: number | undefined;
  widthId: number | undefined;
  lengthId: number | undefined;
  sortId: number | undefined;
  antisepticId: boolean | undefined;
  description: string | undefined;
  price: number | undefined;
}
