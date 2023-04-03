import axios from 'axios';

export const priceApi = {
  async getPricePDF(mid: number) {
    const response = await axios.get(`${process.env.REACT_APP_APP_BASE_URL_API}/price/${mid}`, {
      responseType: 'blob',
    });
    return response.data;
  },
};
