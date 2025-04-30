import { test, expect } from '@playwright/test';
import { TradingPage } from '../pages/trading-page';

test.describe('Buy Stock Functionality Tests', () => {
  let tradingPage: TradingPage;

  test.beforeEach(async ({ page }) => {
    tradingPage = new TradingPage(page);
    await tradingPage.goto();
  });

  test('BUY-01: Buy wine stock with valid data', async () => {
    await tradingPage.buyStock('wine', 100, 50);
    
    // Wait for table to update
    await tradingPage.page.waitForTimeout(1000);
    
    // Verify new entry in the table
    const stockRow = await tradingPage.findStockInTable('wine', 100, 50);
    expect(stockRow).not.toBeNull();
  });

  test('BUY-03: Buy stock with empty fields', async () => {
    await tradingPage.buyStockButton.click();
    await tradingPage.buyBtn.click();  
  });
});