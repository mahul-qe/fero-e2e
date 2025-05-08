// tests/e2e/trading.spec.ts
import { test, expect } from '@playwright/test';
import { TradingPage } from '../pages/trading-page';

test.describe('End-to-End Trading Scenarios', () => {
  let tradingPage: TradingPage;

  test.beforeEach(async ({ page }) => {
    tradingPage = new TradingPage(page);
    await tradingPage.goto();
  });

  test('Complete trading workflow', async ({ page }) => {
    // First buy some wine
    await tradingPage.buyStock('wine', 120, 25);
    
    // Wait for the table to update before checking
    await page.waitForTimeout(1000);
    
    // Verify wine was added to inventory
    let stockRow = await tradingPage.findStockInTable('wine', 120, 25);
    expect(stockRow, 'No wine stock was found in the table after buying').not.toBeNull();
    
    // Now sell some of that wine
    await tradingPage.sellStock('wine', 140, -25);
    await page.waitForTimeout(1000);
    
    // Verify sale was added to inventory
    stockRow = await tradingPage.findStockInTable('wine', 140, -25);
    expect(stockRow, 'No wine sale was found in the table').not.toBeNull();
    
    // Check the table has multiple transactions
    const rows = await tradingPage.getTableRows();
    expect(rows.length).toBeGreaterThanOrEqual(2);
  });
});