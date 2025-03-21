import { Given, When, Then } from '@cucumber/cucumber';
import { CertificationApprovalPage } from '../pages/certificationApprovalPage';  // Path to your CertificationApprovalPage
import { LoginData } from '../../../test-data/certificationApproval-data';

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
  const { username, password } = LoginData.QA;
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