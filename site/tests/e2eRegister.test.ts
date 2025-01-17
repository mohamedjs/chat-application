import { test, expect } from '@playwright/test';
import { mockCountriesData } from '../__mocks__/countriesData';

test.beforeEach(async ({ page }) => {
  // Mock the countries API response
  await page.route('**/api/countries', async (route) => {
    await route.fulfill({
      status: 200,
      body: JSON.stringify(mockCountriesData),
    });
  });

  await page.goto('/'); // Adjust this URL based on your routing setup
});

test.describe('Register Component', () => {
  test('should render register form correctly', async ({ page }) => {
    // Check if main elements are visible
    await expect(page.getByRole('img', { name: 'Logo' })).toBeVisible();
    await expect(page.getByText('Ratatouille')).toBeVisible();
    await expect(page.getByText('Please confirm your country code and enter your phone number.')).toBeVisible();
    await expect(page.getByRole('combobox')).toBeVisible(); // Country select
    await expect(page.locator('#phone')).toBeVisible();
    await expect(page.getByRole('button', { name: /next/i })).toBeVisible();
  });

  test('should show validation errors when submitting empty form', async ({ page }) => {
    // Click submit without filling the form
    await page.getByRole('button', { name: /next/i }).click();

    // Check for error messages
    await expect(page.getByText('Please select a country')).toBeVisible();
    await expect(page.getByText('Please enter your phone number')).toBeVisible();
  });

  test('should allow country selection and update phone placeholder', async ({ page }) => {
    // Select a country
    const countrySelect = page.getByRole('combobox');
    await countrySelect.click();
    await page.getByText('United States +1201').click();

    // Check if phone input placeholder updates with country code
    const phoneInput = page.locator('#phone');
    await expect(phoneInput).toHaveAttribute('placeholder', '+1201');
  });

  test('should successfully submit form with valid data', async ({ page }) => {
    // Fill the form
    await page.getByRole('combobox').click();
    await page.getByText('United States +1201').click();
    await page.fill('#phone', '1234567890');

    // Get the phone input value
    const phoneValue = await page.inputValue('#phone');

    // Set up a dialog handler
    const dialogPromise = page.waitForEvent('dialog');

    // Click the submit button
    await page.getByRole('button', { name: /next/i }).click();

    // Wait for the dialog and check its message
    const dialog = await dialogPromise;
    expect(dialog.message()).toBe(`Submitted phone: ${phoneValue}`);
  });
});
