# Ferovinum QA Automation

This repository contains automated tests for the Ferovinum trading platform, focusing on wine and whisky inventory transactions. The tests cover UI interactions, API endpoints, and end-to-end workflows using Playwright.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Test Coverage](#test-coverage)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Running Tests](#running-tests)
- [Test Development Guidelines](#test-development-guidelines)
- [CI/CD Integration](#cicd-integration)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## 🔍 Project Overview

Ferovinum's trading platform allows businesses in the wine and spirits industry to:
- View existing inventory sold to Ferovinum
- Execute new trades by selling additional inventory to Ferovinum

Our test automation focuses on ensuring these key functionalities work correctly and reliably.

### Application Under Test

- **Frontend**: Next.js application running on http://localhost:4000
- **Backend**: Spring Boot server with H2 database running on http://localhost:4001
- **API Endpoints**: 
  - `GET /stocks?client_id=` - Retrieve stocks
  - `POST /stocks` - Create new stock

## 📊 Test Coverage

Our test suite covers:

1. **UI Tests**
   - Initial page load and element visibility
   - Table display and data verification
   - Form interactions and validations

2. **Functionality Tests**
   - Buy stock operations with various parameters
   - Sell stock operations with various parameters
   - Validation of form inputs and error handling

3. **API Tests**
   - GET endpoint for retrieving stocks
   - POST endpoint for creating stocks
   - Error handling for invalid data

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm (v7 or later)
- Java JDK 11+ (for backend)
- Gradle (for backend)

### Environment Setup

1. **Clone repositories**

   ```bash
   # Clone the Ferovinum frontend repo
   git clone <frontend-repo-url>
   
   # Clone the Ferovinum backend repo
   git clone <backend-repo-url>
   
   # Clone this QA automation repo
   git clone <qa-automation-repo-url>
   ```

2. **Start the backend server**

   ```bash
   # On Unix-like systems:
   ./gradlew bootRun
   
   # On Windows:
   gradlew.bat bootRun
   ```

   The API will be available at http://localhost:4001.

3. **Start the frontend application**

   ```bash
   cd <frontend-repo>
   npm install
   npm run dev
   ```

   The application will be available at http://localhost:4000.

4. **Install test dependencies**

   ```bash
   cd <qa-automation-repo>
   npm install
   npx playwright install
   ```


## 📁 Project Structure

```
ferovinum-qa/
├── playwright.config.ts         # Playwright configuration
├── package.json                 # Project dependencies
├── tests/
│   ├── ui/                      # UI tests
│   │   ├── visual.spec.ts       # Visual/UI verification tests
│   │   ├── buy.spec.ts          # Buy functionality tests
│   │   └── sell.spec.ts         # Sell functionality tests
│   ├── api/                     # API tests
│   │   └── stocks.spec.ts       # Tests for stock endpoints
│   ├── e2e/                     # End-to-end flows
│   │   └── trading.spec.ts      # Complete trading scenarios
├── pages/                       # Page Object Models
│   └── trading-page.ts          # Main trading page object
├── utils/                       # Helper utilities
│   ├── api-helper.ts            # API testing utilities
│   └── test-helper.ts           # General test helpers
```

## ▶️ Running Tests

### Available Commands

```bash
# Run all tests
npm test

# Run specific test groups
npm run test:ui
npm run test:api
npm run test:e2e

# Run tests with browser visible
npm run test:headed

# Run tests in UI mode for debugging
npm run test:ui-mode

# Generate and view HTML report
npm run report
```

### Running Specific Tests

To run a specific test file:

```bash
npx playwright test tests/ui/visual.spec.ts
```

To run tests with specific tags:

```bash
npx playwright test --grep @smoke
```

### Debug Mode

For easier debugging, run tests in UI mode:

```bash
npx playwright test --ui
```

### Test Reports

After test execution, HTML reports are generated. View them with:

```bash
npm run report
```

Or open `playwright-report/index.html` directly in your browser.

## 📝 Test Development Guidelines

### Page Object Pattern

We use the Page Object pattern to encapsulate page interactions:

```typescript
// Example: Adding a new method to trading-page.ts
async filterByStockType(type: string) {
  await this.filterDropdown.click();
  await this.page.getByText(type).click();
  await this.applyFilterButton.click();
}
```

### Selector Best Practices

1. Prefer user-facing attributes:
   ```typescript
   page.getByRole('button', { name: 'Buy Stock' })
   ```

2. Use data attributes for testing when possible:
   ```typescript
   page.locator('[data-testid="stock-table"]')
   ```

3. Use CSS selectors as a last resort:
   ```typescript
   page.locator('.table tbody tr:first-child')
   ```

### Test Structure

1. **Arrange**: Set up preconditions
2. **Act**: Perform the tested action
3. **Assert**: Verify the expected outcome

Example:
```typescript
test('Buy wine stock with valid data', async () => {
  // Arrange
  await tradingPage.goto();
  
  // Act
  await tradingPage.buyStock('wine', 100, 50);
  
  // Assert
  const isStockInTable = await tradingPage.verifyStockInTable('wine', 100, 50);
  expect(isStockInTable).toBeTruthy();
});
```

### Adding New Tests

1. Create or identify the appropriate test file
2. Define test using the test function
3. Implement the test using page objects
4. Add assertions to verify expected behavior
5. Run and verify the test passes consistently

## 🔄 CI/CD Integration

### GitHub Actions

We use GitHub Actions for continuous integration. The workflow is defined in `.github/workflows/playwright.yml`.

On each push and pull request to main branches, the workflow:
1. Sets up the environment
2. Starts backend and frontend services
3. Runs the test suite
4. Publishes test reports

## 📖 Additional Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Page Object Model Pattern](https://playwright.dev/docs/test-pom)
- [Ferovinum API Documentation](internal-link-to-api-docs) - currently not avaliable
- [Test Writing Guidelines](internal-link-to-guidelines) - currently not avaliable