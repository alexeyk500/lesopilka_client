import axios from 'axios';

export const priceApi = {
  async getPrice(mid: number) {
    const response = await axios(`${process.env.REACT_APP_APP_BASE_URL_API}/price/${mid}`, {
      method: 'GET',
      responseType: 'blob',
    });
    return response.data;
  },
};
