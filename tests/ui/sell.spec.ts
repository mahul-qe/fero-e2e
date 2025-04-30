import { test, expect } from '@playwright/test';
import { TradingPage } from '../pages/trading-page';

test.describe('Sell Stock Functionality Tests', () => {
  let tradingPage: TradingPage;

  test.beforeEach(async ({ page }) => {
    tradingPage = new TradingPage(page);
    await tradingPage.goto();
  });

  test('SELL-01: Sell wine stock with valid data', async () => {
    await tradingPage.sellStock('wine', 30, -35);
    
    // Wait for table to update
    await tradingPage.page.waitForTimeout(1000);
    
    // Verify new entry in the table
    const stockRow = await tradingPage.findStockInTable('wine', 30, -35);
    expect(stockRow).not.toBeNull();
  });
});