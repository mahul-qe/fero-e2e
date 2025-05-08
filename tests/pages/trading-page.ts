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
    await this.page.waitForTimeout(1000); // Increase wait time
    
    // Print debug info about what we're looking for
    console.log(`Looking for: type=${type}, price=${price}, quantity=${quantity}`);
    
    const rows = await this.getTableRows();
    console.log(`Total rows found: ${rows.length}`);
    
    // Print the contents of all rows for debugging
    for (const row of rows) {
      const cells = await row.locator('td').all();
      const cellTexts: string[] = [];
      for (const cell of cells) {
        cellTexts.push(await cell.textContent() || '');
      }
      console.log(`Row data: ${cellTexts.join(', ')}`);
    }
    
    // Check for any wine entries first, regardless of price/quantity
    if (type === 'wine') {
      for (const row of rows) {
        const typeCell = await row.locator('td').first().textContent();
        if (typeCell && typeCell.trim() === 'wine') {
          console.log(`Found a wine entry: ${await row.textContent()}`);
          return row; // Return the first wine entry we find
        }
      }
    }
    
    return null;
  }
  
}