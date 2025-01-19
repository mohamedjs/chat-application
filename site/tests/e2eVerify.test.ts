import { test, expect } from '@playwright/test';

test.describe('Verify Component', () => {
  test('should render Verify form correctly', async ({ page }) => {
    await page.goto('/');

    // Wait for and check if main elements are visible
    await expect(page.getByRole('img', { name: 'Logo' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Ratatouille' })).toBeVisible();
    await expect(page.getByText('Please enter otp that you revived in your phone')).toBeVisible();
    
    // Check form elements
    const phoneInput = page.locator('input#otp-id');
    const submitButton = page.getByRole('button', { name: /next/i });

    await expect(phoneInput).toBeVisible();
    await expect(submitButton).toBeVisible();
  });

  // test('should show validation errors when submitting empty form', async ({ page }) => {
  //   await page.goto('/');
  //   // Click submit without filling the form
  //   await page.getByRole('button', { name: /next/i }).click();

  //   // Wait for and check error messages
  //   const errors = [
  //     page.getByText('Please select a country'),
  //     page.getByText('Please enter your phone number')
  //   ];

  //   // Check that all error messages are visible
  //   await Promise.all(errors.map(error => expect(error).toBeVisible()));
  // });

  // test('should allow country selection and update phone placeholder', async ({ page }) => {
  //   await page.goto('/');
  //   // Select a country
  //   const countrySelect = page.getByRole('combobox');
  //   await countrySelect.click();
    
  //   // Wait for dropdown to be visible and select country
  //   await page.getByText('United States +1201').click();

  //   // Check if phone input placeholder updates
  //   const phoneInput = page.locator('input#phone');
  //   await expect(phoneInput).toHaveAttribute('placeholder', '+1201');
  // });

  // test('should successfully submit form with valid data', async ({ page }) => {
  //   await page.goto('/');
  //   const countrySelect = page.getByRole('combobox');
  //   const phoneInput = page.locator('input#phone');

  //   await countrySelect.click();
  //   await page.getByText('United States +1201').click();
  //   await phoneInput.fill('1234567890');
  //   const phoneValue = await phoneInput.inputValue();

  //   page.once('dialog', dialog => {
  //     expect(dialog.message()).toBe(`Submitted phone: ${phoneValue}`);
  //     dialog.accept();
  //   });

  //   const submitButton = page.getByRole('button', { name: /next/i });
  //   await expect(submitButton).toBeEnabled();
  //   await submitButton.click();
  // });

  // test('should handle API errors gracefully', async ({ page }) => {    
  //   await page.route('**/api/listCountries', async (route) => {
  //     await route.fulfill({
  //       status: 500,
  //       body: JSON.stringify({error: 'server error'}),
  //     });
  //   });
  //   await page.goto('/');
  //   await expect(page.getByText(/Error loading countries/i)).toBeVisible();
  // });
});