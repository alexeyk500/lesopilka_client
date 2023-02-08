import {OrderType} from "../types/types";

type ManufacturerOrdersSliceType = {
  selectedOrderStatusId: number;
  dateFrom: string;
  dateTo: string;
  orders: OrderType[];
  isLoading: boolean;
};
