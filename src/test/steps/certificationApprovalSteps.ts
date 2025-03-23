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

When('the employee uploads a valid certificate', async function () {
  // Upload a certificate from the specified path
  await certificationApprovalpage.uploadValidCertificate('downloads/negativeGP.jpg');
});

Then('the employee should see the valid file name of the uploaded certificate displayed', async function () {
  //verify the file name is displayed
  await certificationApprovalpage.verifyValidFileNameDisplayed('negativeGP.jpg');
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

When('the manager leaves the comment box empty', async () => {
  await certificationApprovalpage.clearCommentBox();  // Clear the comment box to leave it empty
});


When('the manager clicks the Approve button', async () => {
  // Click the Approve button
  await certificationApprovalpage.clickApproveButton();
});

Then('the request should be approved successfully', async () => {
  // Verify if the success message is shown
  await certificationApprovalpage.verifyApprovalSuccess();
});

// Manager clicks on the "Decline" button for a task
When('the manager clicks the Decline button', async () => {
  // Use the method from your POM to click on the Decline button
  await certificationApprovalpage.clickDeclineButton();
});

// Manager should see a success message indicating the request was declined
Then('the request should be declined successfully', async () => {
  // Verify if the decline success message is displayed
  await certificationApprovalpage.verifyDeclineSuccess();
});

//Manager signs out
When('the manager clicks the sign-out button', async () => {
  await certificationApprovalpage.openUserDropdown(); // Open the dropdown
  await certificationApprovalpage.clickSignOut();  // Call the sign-out method
});

Then('the manager should be redirected to the login page', async () => {
  await certificationApprovalpage.verifyRedirectedToLoginPage();  // Verify redirection to the login page
});

// HR user logs in
When('the HR user is on the login page', async () => {
  await certificationApprovalpage.open();  // Open the login page
});

When('the HR user fills the login form with valid HR credentials', async () => {
  const { username, password } = LoginData.HR;
  await certificationApprovalpage.fillLoginForm(username, password);  // Pass HR credentials
});

When('the HR user clicks the sign-in button', async () => {
  await certificationApprovalpage.clickSignIn();  // Click the sign-in button
});

Then('the HR user should see that the page title is "SD Worx"', async () => {
  await certificationApprovalpage.verifyPageTitle('SD Worx');  // Assert that the page title is correct
});

// Step to click the notifications bell icon (to open the notification list)
Given('the HR user hover on the notifications bell', async () => {
  await certificationApprovalpage.hoverOverNotificationBell(); // Hover on the bell icon
});

// Step to click the first notification item in the list
When('the HR user clicks on the first notification', async () => {
   await certificationApprovalpage.clickFirstNotification(); // Click the first notification
});

Then('the HR user should see the notification with the title {string}', async (title: string) => {
  await certificationApprovalpage.isNotificationWithTitleVisible(title); // Verify that the title matches the expected

});

Then('the HR user should see the notification with the message {string}', async (message: string) => {
    await certificationApprovalpage.verifyNotificationBody(message); // Verify that the message matches the expected
});

// Step to check if HR sees the notification title for the decline scenario
Then('the HR user should see the decline notification with the title {string}', async (title: string) => {
  await certificationApprovalpage.isNegativeNotificationWithTitleVisible(title); // Verify that the title matches the expected
});

// Step to check if HR sees the notification message for the decline scenario
Then('the HR user should see the decline notification with the message {string}', async (message: string) => {
  await certificationApprovalpage.verifyNegativeNotificationBody(message); // Verify that the message matches the expected
});


When('the HR user clicks the sign-out button', async function () {
  await certificationApprovalpage.clickHrSignOutButton();  // Call the method to click sign out
});

Then('the HR user should be redirected correctly to the login page', async function () {
  await certificationApprovalpage.verifyLoginPage();  // Call the method to verify the login page
});

Given('the employee hover on the notifications bell', async () => {
  await certificationApprovalpage.hoverOverEmpNotificationBell(); // Hover on the bell icon
});

Given('the employee clicks on the first notification', async () => {
  await certificationApprovalpage.clickFirstEmployeeNotification(); // Hover on the bell icon
});

Then('the employee should see the notification with the title {string}', async (title: string) => {
  await certificationApprovalpage.isEmployeeNotificationWithTitleVisible(title); // Verify that the title matches the expected

});

Then('the employee should see the notification with the message {string}', async (message: string) => {
    await certificationApprovalpage.verifyEmployeeNotificationBody(message); // Verify that the message matches the expected
});


Then('the employee should see the decline notification with the title {string}', async (title: string) => {
  await certificationApprovalpage.isEmployeeNegativeNotificationWithTitleVisible(title); // Verify that the title matches the expected

});

Then('the employee should see the decline notification with the message {string}', async (message: string) => {
    await certificationApprovalpage.verifyNegativeEmployeeNotificationBody(message); // Verify that the message matches the expected
});


Then('the employee should see certificate is present', async function () {
  await certificationApprovalpage.verifyCertificationIsPresent();
});

Then('the employee should see {string} certificate is not present', async function (imageName: string) {
  await certificationApprovalpage.verifyCertificationIsNotPresent(imageName);
});