import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { EmployeeLoginPage } from '../pages/empLoginPage';  // Path to your empLoginPage.ts file

let employeeLoginPage: EmployeeLoginPage;

Given('the employee is on the login page', async function () {
  // Access the page from the context
  const page = this.page;  // Ensure that 'page' is available in the context
  employeeLoginPage = new EmployeeLoginPage(page);
  
  // Open the login page
  await employeeLoginPage.open();
});

When('the employee enters valid credentials', async function () {
  // Fill in the login form with valid credentials
  await employeeLoginPage.fillLoginForm('KvnTestEmp@gp.com', 'autoss#12');
});

When('the employee click on sign in button', async function () {
  // Click the sign-in button
  await employeeLoginPage.clickSignIn();
});

Then('the employee should be redirected to the homepage', async function () {
  // Assert that the user is redirected to the homepage (or dashboard)
  const isRedirected = await employeeLoginPage.isRedirectedToHomepage();
  expect(isRedirected).toBe(true);  // This checks if the page title is 'SD Worx'
  
});

When('the employee navigates to the add certificate page', async function () {
  // Navigate through the menu to reach the add certificate section
  await employeeLoginPage.navigateToAddCertificate();
});

When('the employee uploads a certificate', async function () {
  // Upload a certificate by providing the file path
  await employeeLoginPage.uploadCertificate('C:/Users/sd273019/Downloads/certificationGP.jpg');
});

Then('the employee should see the request recorded message', async function () {
  // Verify that the request was recorded and validated
  await employeeLoginPage.verifyRequestRecorded();
});