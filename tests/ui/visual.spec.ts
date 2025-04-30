import { test, expect } from '@playwright/test';
import { TradingPage } from '../pages/trading-page';

test.describe('UI Visual Tests', () => {
  let tradingPage: TradingPage;

  test.beforeEach(async ({ page }) => {
    tradingPage = new TradingPage(page);
    await tradingPage.goto();
  });

  test('UI-01: Verify initial page load', async () => {
    await expect(tradingPage.buyStockButton).toBeVisible();
    await expect(tradingPage.sellStockButton).toBeVisible();
  });

  test('UI-02: Verify inventory table display', async () => {
    await expect(tradingPage.stockTable).toBeVisible();
    
    // Check column headers
    const headers = tradingPage.stockTable.locator('thead th');
    await expect(headers.nth(0)).toHaveText('Stock Type');
    await expect(headers.nth(1)).toHaveText('Price');
    await expect(headers.nth(2)).toHaveText('Quantity');
    await expect(headers.nth(3)).toHaveText('Sale Date');
  });

  test('UI-04: Verify "Buy Stock" button functionality', async ({ page }) => {
    await tradingPage.buyStockButton.click();
    
    // Check if form appears with all required fields
    await expect(tradingPage.stockTypeField).toBeVisible();
    await expect(tradingPage.buyPriceField).toBeVisible();
    await expect(tradingPage.buyQuantityField).toBeVisible();
  });
});