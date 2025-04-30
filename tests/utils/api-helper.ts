import { request, APIRequestContext } from '@playwright/test';

export class StocksAPI {
  readonly request: APIRequestContext;
  readonly baseURL: string = 'http://localhost:4001';

  constructor(apiContext: APIRequestContext) {
    this.request = apiContext;
  }

  async getStocks(clientId: string = '') {
    const response = await this.request.get(`${this.baseURL}/stocks?client_id=${clientId}`);
    return response;
  }

  async createStock(stockData: {
    type: string;
    price: number;
    quantity: number;
  }) {
    const response = await this.request.post(`${this.baseURL}/stocks`, {
      data: stockData
    });
    return response;
  }
}