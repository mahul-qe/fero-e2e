// tests/e2e/trading.spec.ts
import { test, expect } from '@playwright/test';
import { TradingPage } from '../pages/trading-page';

test.describe('End-to-End Trading Scenarios', () => {
  let tradingPage: TradingPage;

  test.beforeEach(async ({ page }) => {
    tradingPage = new TradingPage(page);
    await tradingPage.goto();
  });

  test('Complete trading workflow', async () => {
    // First buy some wine
    await tradingPage.buyStock('wine', 120, 75);
    await tradingPage.page.waitForTimeout(1000);
    
    // Verify wine was added to inventory
    let stockRow = await tradingPage.findStockInTable('wine', 120, 75);
    expect(stockRow).not.toBeNull();
    
    // Now sell some of that wine
    await tradingPage.sellStock('wine', 140, -25);
    await tradingPage.page.waitForTimeout(1000);
    
    // Verify sale was added to inventory
    stockRow = await tradingPage.findStockInTable('wine', 140, -25);
    expect(stockRow).not.toBeNull();
    
    // Check the table has both transactions
    const rows = await tradingPage.getTableRows();
    expect(rows.length).toBeGreaterThanOrEqual(2);
  });
});