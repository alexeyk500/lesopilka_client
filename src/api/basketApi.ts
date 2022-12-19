import {instanceAxios, setAuthHeader} from "./instanceAxios";
import {ProductType} from "../types/types";

export const basketApi = {
  async getBasketProducts(token: string) {
    const response = await instanceAxios.get<ProductType[]>(`/baskets`, setAuthHeader(token));
    return response.data;
  },
};
