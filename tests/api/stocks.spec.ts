import { test, expect, request } from '@playwright/test';
import { StocksAPI } from '../utils/api-helper';

test.describe('Stocks API Tests', () => {
  let stocksAPI: StocksAPI;

  test.beforeEach(async () => {
    const apiContext = await request.newContext();
    stocksAPI = new StocksAPI(apiContext);
  });

  test('API-01: GET /stocks endpoint', async () => {
    const response = await stocksAPI.getStocks();
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(Array.isArray(data)).toBeTruthy();
  });

  test('API-02: POST /stocks endpoint with valid data', async () => {
    const response = await stocksAPI.createStock({
      type: 'wine',
      price: 100,
      quantity: 50
    });
    console.log('Response:', await response.json());
    // expect(response.ok()).toBeTruthy();
  });
});