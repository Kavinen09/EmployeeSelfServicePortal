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
}