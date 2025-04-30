import { Page, Locator } from '@playwright/test';

export class TradingPage {
  readonly page: Page;
  readonly buyStockButton: Locator;
  readonly sellStockButton: Locator;
  readonly stockTypeField: Locator;
  readonly buyPriceField: Locator;
  readonly sellPriceField: Locator;
  readonly buyQuantityField: Locator;
  readonly sellQuantityField: Locator;
  readonly buyBtn: Locator;
  readonly sellBtn: Locator;
  readonly stockTable: Locator;

  constructor(page: Page) {
    this.page = page;
    this.buyStockButton = page.getByRole('button', { name: 'Buy Stock' });
    this.sellStockButton = page.getByRole('button', { name: 'Sell Stock' });
    this.stockTypeField = page.getByRole('textbox', { name: 'Type' });
    this.buyPriceField = page.getByRole('spinbutton', { name: 'Price' });
    this.sellPriceField = page.locator('#sell-price');
    this.buyQuantityField = page.getByRole('spinbutton', { name: 'Quantity' });
    this.sellQuantityField = page.locator('#sell-quantity');
    this.buyBtn = page.getByRole('button', { name: 'Buy' });
    this.sellBtn = page.getByRole('button', { name: 'Sell' });
    this.stockTable = page.locator('table');
  }

  async goto() {
    await this.page.goto('/');
  }

  async buyStock(type: string, price: number, quantity: number) {
    await this.buyStockButton.click();
    await this.stockTypeField.fill(type);
    await this.buyPriceField.fill(price.toString());
    await this.buyQuantityField.fill(quantity.toString());
    await this.buyBtn.click();
  }

  async sellStock(type: string, price: number, quantity: number) {
    await this.sellStockButton.click();
    await this.stockTypeField.fill(type);
    await this.sellPriceField.fill(price.toString());
    await this.sellQuantityField.fill(quantity.toString());
    await this.sellBtn.click();
  }

  async getTableRows() {
    return this.stockTable.locator('tbody tr').all();
  }

  async findStockInTable(type: string, price: number, quantity: number) {
    const rows = await this.getTableRows();
    for (const row of rows) {
      const rowType = await row.locator('td').nth(0).textContent();
      const rowPrice = await row.locator('td').nth(1).textContent();
      const rowQuantity = await row.locator('td').nth(2).textContent();
      
      if (rowType === type && 
          parseInt(rowPrice || '0') === price && 
          parseInt(rowQuantity || '0') === quantity) {
        return row;
      }
    }
    return null;
  }
}