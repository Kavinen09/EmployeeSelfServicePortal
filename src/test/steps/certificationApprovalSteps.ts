import { Given, When, Then } from '@cucumber/cucumber';
import { CertificationApprovalPage } from '../pages/certificationApprovalPage';  // Path to your CertificationApprovalPage
import { LoginData } from '../../../test-data/certificationApproval-data';
import { expect } from 'playwright/test';

let certificationApprovalpage: CertificationApprovalPage;

Given('the employee is on the login page', async function () {
  // Access the page from the context
  const page = this.page;  // Ensure that 'page' is available in the context
  certificationApprovalpage = new CertificationApprovalPage(page);
  
  // Open the login page
  await certificationApprovalpage.open();
});

When('the employee fills the login form with valid credentials', async function () {
  // Fill in the login form with valid credentials
  const { username, password } = LoginData.EMP;
  await certificationApprovalpage.fillLoginForm(username, password);
});

When('the employee clicks the sign-in button', async function () {
  // Click the sign-in button
  await certificationApprovalpage.clickSignIn();
});

Then('the employee should see that the page title is {string}', async function (expectedTitle: string) {
  // Get the page title and return it for verification
  await certificationApprovalpage.verifyPageTitle(expectedTitle);
});

When('the employee navigates to the add certifications page', async function () {
  // Navigate to the "Add Certificate" page
  await certificationApprovalpage.navigateToAddCertificate();
});

When('the employee uploads a certificate', async function () {
  // Upload a certificate from the specified path
  await certificationApprovalpage.uploadCertificate('downloads/certificationGP.jpg');
});

Then('the employee should see the file name of the uploaded certificate displayed', async function () {
  //verify the file name is displayed
  await certificationApprovalpage.verifyFileNameDisplayed('certificationGP.jpg');
});

Then('the employee should see the request recorded message', async function () {
  // Verify that the request was recorded and validated
  await certificationApprovalpage.verifyRequestRecorded();
});

Then('the employee clicks the sign-out button', async function () {
  // Click the sign-out button to log out
  await certificationApprovalpage.signOut();
});

Then('the employee should be redirected correctly to the login page', async function () {
  // Verify the redirection to the login page
  await certificationApprovalpage.verifyRedirectedToLoginPage();
});

Given('the manager is on the login page', async function () {
  // Access the page and open the login page
  await certificationApprovalpage.open();
});

When('the manager fills the login form with valid manager credentials', async function () {
  const { username, password } = LoginData.MAN;  // Replace with actual manager credentials
  await certificationApprovalpage.fillLoginForm(username, password);
});

When('the manager clicks the sign-in button', async function () {
  await certificationApprovalpage.clickSignIn();
});

Then('the manager should see that the page title is "SD Worx"', async function () {
  await certificationApprovalpage.verifyPageTitle("SD Worx");
});

// Step for clicking on the "My Tasks" menu
When('the manager clicks on the My Tasks menu', async () => {
  await certificationApprovalpage.clickMyTasksMenu(); // Use the method from POM to click "My Tasks" menu
});

When('the manager clicks on the first task row', async () => {
  // Click on the first task row
  await certificationApprovalpage.clickFirstTaskRow();
});

When('the manager types in the comment box with the text {string}', async (commentText) => {
  // Fill the comment box with the provided text
  await certificationApprovalpage.fillCommentBox(commentText);
});

When('the manager clicks the Approve button', async () => {
  // Click the Approve button
  await certificationApprovalpage.clickApproveButton();
});

Then('the request should be approved successfully', async () => {
  // Verify if the success message is shown
  await certificationApprovalpage.verifyApprovalSuccess();
});