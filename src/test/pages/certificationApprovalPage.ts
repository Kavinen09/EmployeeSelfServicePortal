import { Page } from 'playwright';
import { expect } from '@playwright/test';

export class CertificationApprovalPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Selectors for login form elements
  private usernameInput = '#username';
  private passwordInput = '#password';
  private signInButton = '#kc-login';

  // Selectors for navigating the menu and adding a certificate
  private essMenuButton = '#ess-menu';  // ESS menu dropdown
  private personalInfoMenuButton = '#ess-personal-info-menu';
  private educationMenu = 'li:has-text("Education")'; // Selects the Education menu
  private certificationsMenuItem = 'li:has-text("Education") >> ul >> li:has-text("Certifications")'; // Selects the Certifications item in Education
  private addButton = 'button:has-text("Add")';  // Selects the "Add" button
  private certificationDropdown = 'ng-select span';  // Dropdown for selecting the certificate
  private certificationLink = 'a:has-text("Certification 1 (Driving")';  // Link for selecting a certificate
  private fileInputTextbox = 'label:has-text("Choose or drop a file")';  // File input field
  private fileSavedMessage = 'li:has-text("File saved")'; // File saved message displayed
  private fileName = 'label:has-text("certificationGP.jpg")'; // File name displayed after "File saved"
  private submitButton = 'button:has-text("Submit")';  // Submit button after adding the certificate
  private successMessage = 'div[role="alert"]:has-text("Your request was recorded.")';  // Success message after submission
  private validationMessage = 'div.col-right--warning:has-text("Your request is in the process of being validated.")';  // Validation message

  // Selectors for sign-out functionality
  private userProfile = 'li.nav-user-menu span.nav-user-name'; // User profile dropdown (for sign-out)
  private signOutButton = 'li.nav-user-menu .user-sign-out'; // Sign out button
  private loginPageHeader = '#kc-header-wrapper'; // To verify redirection to the login page

  private myTasksMenu = '#my-tasks-menu'; // My Tasks menu item
  private firstTaskRow = 'tr.pointer.task-not-viewed'; // First row in the task table
  private commentBox = '#gp-comment'; // Comment box
  private approveButton = 'button[test-id="Approve"]'; // Approve button

  // Selector for the dropdown menu
  private userDropdown = 'span.nav-user-name'; // The dropdown trigger (user name)
  private manSignOutButton = 'a.user-sign-out'; // The sign-out button in the dropdown
  
  private notificationBell = '[test-id="navbar-notifications"]'; // Notifications bell icon
  private firstNotificationItem = 'gp-communications-card.dropdown-menu.visible .sl-item:first-of-type .sl-content .pointer'; // First notification item 
  private notificationTitle = '.notifications-list .notification:first-of-type .notification-title'; // Locator for the title

  private hrProfile = 'span.nav-user-name';
  private hrsignOutButton = 'a.dropdown-item.user-sign-out'
  private hrDropdownMenu = '.nav-item.dropdown.nav-user-menu .dropdown-menu'

  // Method to open the login page
  async open() {
    await this.page.goto('https://globalsolutions-reference.gpi-test.globepayroll.net/ui/#/dashboard', {
      timeout: 60000,
      waitUntil: 'domcontentloaded',
    });
  }

  // Method to fill the login form with valid credentials
  async fillLoginForm(username: string, password: string) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
  }

  // Method to click the sign-in button
  async clickSignIn() {
    await this.page.click(this.signInButton);
  }

  // Assertion for verifying page title
  async verifyPageTitle(expectedTitle: string) {
    const pageTitle = await this.page.title();
    expect(pageTitle).toBe(expectedTitle);
  }

  // Refined method to navigate to the Add Certificate page
  async navigateToAddCertificate() {
    await this.page.locator(this.essMenuButton).click();
    await this.page.locator(this.personalInfoMenuButton).click();
    const educationMenu = this.page.locator(this.educationMenu);
    await educationMenu.click();
    const certificationsMenu = await this.page.locator(this.certificationsMenuItem);
    await certificationsMenu.waitFor({ state: 'visible' });
    await certificationsMenu.click();
    const addButton = await this.page.locator(this.addButton);
    await addButton.waitFor({ state: 'visible' });
    await addButton.click();
  }

  // Method to upload a certificate
  async uploadCertificate(filePath: string) {
    await this.page.locator(this.certificationDropdown).first().click();
    await this.page.locator(this.certificationLink).click();
    await this.page.locator(this.fileInputTextbox).setInputFiles(filePath);

    const fileSavedLocator = this.page.locator(this.fileSavedMessage);
    await fileSavedLocator.waitFor({ state: 'visible', timeout: 60000 });
    await fileSavedLocator.waitFor({ state: 'detached' });

    const fileNameLocator = this.page.locator(this.fileName);
    await fileNameLocator.waitFor({ state: 'visible', timeout: 60000 });

    await this.page.locator(this.submitButton).click();
  }

  // Method to verify that the file name is displayed
  async verifyFileNameDisplayed(expectedFileName: string) {
    const fileNameLocator = this.page.locator(`label:has-text("${expectedFileName}")`);
    await fileNameLocator.waitFor({ state: 'visible', timeout: 60000 });
  }
  // Method to check the success message after submission
  async verifyRequestRecorded() {
    const toastLocator = this.page.locator(this.successMessage);
    await toastLocator.waitFor({ state: 'visible', timeout: 60000 });

    const validationMessageLocator = this.page.locator(this.validationMessage);
    await validationMessageLocator.waitFor({ state: 'visible', timeout: 60000 });
  }

  // Method to sign out
  async signOut() {
    const userProfileDropdown = this.page.locator(this.userProfile);
    await userProfileDropdown.waitFor({ state: 'visible', timeout: 60000 });
    await userProfileDropdown.click();

    const signOutBtn = this.page.locator(this.signOutButton);
    await signOutBtn.waitFor({ state: 'visible', timeout: 60000 });
    await signOutBtn.click();
  }

  // Method to verify that the employee is redirected to the login page
  async verifyRedirectedToLoginPage() {
    const loginPageHeader = this.page.locator(this.loginPageHeader);
    await loginPageHeader.waitFor({ state: 'visible', timeout: 60000 });

    const headerText = await loginPageHeader.textContent();
    expect(headerText).toContain('globalsolutions-reference');
  }

  async clickMyTasksMenu() {
    const myTasksMenuLocator = this.page.locator(this.myTasksMenu);
    await myTasksMenuLocator.click(); // Click on "My Tasks" menu
  }
  
  // Method to click on the first task row
  async clickFirstTaskRow() {
    const firstTaskRowLocator = this.page.locator(this.firstTaskRow);
    await firstTaskRowLocator.click(); // Click on the first task row
  }

  // Method to fill the comment box
  async fillCommentBox(commentText: string) {
    const commentBoxLocator = this.page.locator(this.commentBox);
    await commentBoxLocator.fill(commentText); // Fill the comment box with the provided text
  }

  // Method to click the approve button
  async clickApproveButton() {
    const approveButtonLocator = this.page.locator(this.approveButton);
    await approveButtonLocator.click(); // Click the approve button
  }

  // Method to verify if the success message is shown
  async verifyApprovalSuccess() {
    const successToastLocator = this.page.locator('div.toast-message:has-text("You successfully completed the task.")');
    await successToastLocator.waitFor({ state: 'visible', timeout: 30000 });

    // Get the text content and assert that it's not null
    const successMessageText = await successToastLocator.textContent();
  
    // Assert that successMessageText is not null and contains the expected text
    expect(successMessageText).toBeTruthy(); // Ensures the message is not null or undefined
    expect(successMessageText).toContain('You successfully completed the task.');
  }

  // Method to open the dropdown
  async openUserDropdown() {
    const dropdownLocator = this.page.locator(this.userDropdown);
    await dropdownLocator.click(); // Click to open the dropdown
  }

  // Method to click the sign-out button
  async clickSignOut() {
    const signOutLocator = this.page.locator(this.manSignOutButton);
    await signOutLocator.click(); // Click to sign out
  }
  
  async hoverOverNotificationBell(){
    const bell = this.page.locator(this.notificationBell);
    await bell.waitFor({ state: 'visible', timeout: 15000 }); // Wait for bell to appear
    await bell.hover(); // Hover to show the notification dropdown

    // Optional: Wait for the dropdown to appear
    await this.page.waitForTimeout(500); // Wait half a second for dropdown to appear
  }
  
  // Public method to click on the first notification
  async clickFirstNotification() {
   const firstNotification = this.page.locator(this.firstNotificationItem);
    await firstNotification.waitFor({ state: 'visible', timeout: 15000 }); // Wait for first notification to appear
    await firstNotification.click(); // Click the first notification

    // Wait for the notification details to load
  const notificationDetailsLocator = '.notificationDetails'; // Adjust the locator if needed
  await this.page.locator(notificationDetailsLocator).waitFor({ state: 'visible', timeout: 15000 });
  }
  
 
  async isNotificationWithTitleVisible(expectedTitle: string) {
    const titleLocator = this.page.locator(this.notificationTitle);
    await titleLocator.waitFor({ state: 'visible', timeout: 15000 }); // Wait for the title to appear
    const actualTitle = await titleLocator.innerText();
    expect(actualTitle).toBe(expectedTitle); // Assert the title matches the expected value
  }

  // Method to verify the notification body content
  async verifyNotificationBody(expectedMessage: string) {
   // Locate the first (latest) notification
  const latestNotification = this.page.locator('.notifications-list .notification-description').first();
  // Wait for the latest notification to be visible
  await latestNotification.waitFor({ state: 'visible', timeout: 20000 });
  // Get the actual message text from the latest notification
  const actualMessage = await latestNotification.textContent(); // Use textContent to get the exact text
  // Check if the message is null
  if (actualMessage === null) {
    throw new Error("Notification message is null, unable to verify the content.");
  }
  // Clean up the actual message: Remove unwanted parts, trim, and normalize spaces
  const cleanedMessage = actualMessage
    .replace(/[\u2022|\u00B7]\s*/g, '') // Remove bullet points and extra spaces
    .replace(/KvnTest Emp has requested changes in Certifications[^.]+/g, '') // Remove the part about the request being made
    .replace(/\s+/g, ' ')  // Normalize spaces (replace multiple spaces with a single space)
    .trim(); // Trim leading and trailing spaces
  // Log the cleaned actual message for debugging purposes (optional, can be removed later)
  console.log(`Cleaned actual notification body: ${cleanedMessage}`);
  // Assert that the actual cleaned message contains the expected comment
  expect(cleanedMessage).toContain('The request was approved by KvnTest Man with the following comment: Certification Valid. Request approve.');
  }

  async clickHrSignOutButton(){
   // Wait for the user profile to be visible before clicking
    const hrProfileLocator = this.page.locator(this.hrProfile);
    await hrProfileLocator.waitFor({ state: 'visible', timeout: 10000 });

    // Click on the user profile to open the dropdown
    await hrProfileLocator.click();

    // Wait for the specific dropdown menu to be visible
    const hrDropdownMenuLocator = this.page.locator(this.hrDropdownMenu);
    await hrDropdownMenuLocator.waitFor({ state: 'visible', timeout: 10000 });

    // Wait for the sign-out button (anchor) to be visible, then click on it
    const hrsignOutButtonLocator = this.page.locator(this.hrsignOutButton);
    await hrsignOutButtonLocator.waitFor({ state: 'visible', timeout: 10000 });
    
    // If the button is visible, click on it
    await hrsignOutButtonLocator.click();
  }

  // Method to verify if the user is redirected to the login page
  async verifyLoginPage(){
    const loginPageHeader = this.page.locator(this.loginPageHeader);
    await loginPageHeader.waitFor({ state: 'visible', timeout: 60000 });

    const headerText = await loginPageHeader.textContent();
    expect(headerText).toContain('globalsolutions-reference');
    
  }


}