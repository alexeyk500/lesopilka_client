export type OptionsType = {
  id: number | undefined;
  title: string;
  key?: string;
  value?: string;
  toolTip?: string;
};

export type AddressType = {
  id: number;
  region: RegionType;
  location: LocationType;
  street: string;
  building: string;
  office: string;
};

export type ManufacturerType = {
  id: number;
  inn: string;
  title: string;
  phone: string;
  email: string;
  address: AddressType;
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

export type ProductMaterialType = {
  id: number;
  title: string;
  isPine: boolean;
  order: number;
};

export enum ServerDeliveryMethodEnum {
  selfPickUp = 'Самовывоз',
  delivery = 'Доставка',
}

export type ServerOrderStatusType = 'onConfirming' | 'confirmedOrder' | 'canceledByUser' | 'canceledByManufacturer';

export enum OrderStatusEnum {
  onConfirming = 'На подтверждении',
  confirmedOrder = 'Подтвержден',
  canceledByUser = 'Отмена клиентом',
  canceledByManufacturer = 'Отказ поставщика',
  inArchive = 'В архиве',
}

export enum OrderViewEnum {
  active = 'Активные',
  onConfirming = 'На подтверждении',
  confirmedOrder = 'Подтвержден',
  canceledByUser = 'Отмена клиентом',
  canceledByManufacturer = 'Отказ поставщика',
  inArchive = 'В архиве',
  all = ' Все',
}

export type OrderInfoType = {
  id: number;
  orderDate: string;
  deliveryDate: string;
  status: OrderStatusEnum;
  contactPersonName: string;
  contactPersonPhone: string;
  deliveryAddress: string;
  userId: number;
  manufacturerId: number;
  paymentMethod: OptionsType;
  deliveryMethod: OptionsType;
  location: {
    id: number;
    title: string;
    regionId: number;
    region: {
      id: number;
      title: string;
    };
  };
  deliveryPrice: number | null;
  manufacturerConfirmedDate: string;
  inArchiveForUser: boolean;
  inArchiveForManufacturer: boolean;
  userInfo?: { id: string } & UserType;
};

export type OrderType = {
  order: OrderInfoType;
  products: ProductType[];
  confirmedProducts?: ProductType[];
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
  manufacturer?: ManufacturerType;
  code?: string;
  price?: string;
  isSeptic?: boolean;
  isDried?: boolean;
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
  confirmedProductId?: number;
  amountInBasket?: number;
  amountInOrder?: number;
  amountInConfirmation?: number;
  amountInDivergence?: number;
};

export enum AmountTypeEnum {
  inBasket = 'Корзина',
  inOrder = 'Заказ',
  inConfirmation = 'Подтверждение',
  inDivergence = 'Расхождения',
}

export enum QueryEnum {
  CatalogCategory = 'cid',
  CatalogSubCategory = 'scid',
  SizeHeight = 'sh',
  SizeWidth = 'sw',
  SizeCaliber = 'sc',
  SizeLength = 'sl',
  SortId = 'psid',
  Septic = 'sep',
  Dried = 'dri',
  SearchRegionId = 'srid',
  SearchLocationId = 'slid',
  ManufacturerId = 'mid',
  PriceFrom = 'pf',
  PriceTo = 'pt',
  SortDirection = 'sd',
  CurrentPage = 'page',
  PageSize = 'size',
  PageType = 'top',
}

export enum PageTypeEnum {
  manufacturerPage = 'mp',
  pricePage = 'price',
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

export enum DriedEnum {
  noDried = 'Естественная влажность',
  dried = 'Камерная сушка',
}

export enum SortDirectionEnum {
  PriceASC = 'pa',
  PriceDESC = 'pd',
}

export enum SortDirectionTitleEnum {
  pa = 'Цена по возрастанию',
  pd = 'Цена по убыванию',
}

export enum EditCardSectionsEnum {
  lumber = 'Пиломатериал',
  sizes = 'Размеры',
  sortAndSeptic = 'Доп. характеристики',
  images = 'Фото',
  description = 'Описание',
  code = 'Артикул',
  price = 'Цена',
}

export enum PriceSelectedTypeEnum {
  published = 'published',
  draft = 'draft',
  all = 'all',
}

export enum DeliveryMethodEnum {
  pickup = 'Самовывоз',
  delivery = 'Доставка',
}

export enum PaymentMethodEnum {
  transferToAccount = 'Банковский перевод',
  transferToCard = 'Перевод на карту',
  card = 'Картой',
  cash = 'Наличными',
}

export type OrderMessageType = {
  id: number;
  messageDate: string;
  messageText: string;
  userId: number | null;
  manufacturerId: number | null;
  orderId: number;
};
