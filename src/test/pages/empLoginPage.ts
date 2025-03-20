import { Page } from 'playwright';

export class EmployeeLoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Selectors for form elements
  private usernameInput = '#username';
  private passwordInput = '#password';
  private signInButton = '#kc-login';

  // Selectors for navigating through the menu and adding a certificate
  private essMenuButton = '#ess-menu';  // ESS menu dropdown
  private personalInfoMenuButton = '#ess-personal-info-menu';
  private educationMenu = 'li:has-text("Education")'; // This selects the Education menu
  private certificationsMenuItem = 'li:has-text("Education") >> ul >> li:has-text("Certifications")'; // This selects the Certifications item in Education
  private addButton = 'button:has-text("Add")'; // This selects the "Add" button
  private certificationDropdown = 'ng-select span';  // Dropdown for selecting the certificate
  
  private certificationLink = 'a:has-text("Certification 1 (Driving")';  // Example link for selecting a certificate
  private fileInputTextbox = 'label:has-text("Choose or drop a file")';  // File input field
  private submitButton = 'button:has-text("Submit")';  // Submit button after adding the certificate
  private successMessage = 'div[role="alert"]:has-text("Your request was recorded.")';  // Success message after submission
  private validationMessage = 'div.col-right--warning:has-text("Your request is in the process of being validated.")';  // Validation message



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

  // Method to check if the user is redirected to the homepage
  async isRedirectedToHomepage() {
    // Assert that the page title is "SD Worx" (or any other homepage-specific check)
    const pageTitle = await this.page.title();
    return pageTitle === 'SD Worx';  // Ensure the title matches "SD Worx"
  }

  // Refined method to navigate to Add Certificate page
  async navigateToAddCertificate() {
 // Wait for the ESS menu to be clickable
  await this.page.locator(this.essMenuButton).click(); // Open ESS Menu
  await this.page.locator(this.personalInfoMenuButton).click(); // Click Personal Info Menu
  
  // First, click the Education menu
  const educationMenu = this.page.locator(this.educationMenu);
  await educationMenu.click();

  // Refine the selector by ensuring it's within the Education menu
  const certificationsMenu = await this.page.locator(this.certificationsMenuItem);
  await certificationsMenu.waitFor({ state: 'visible' });
  await certificationsMenu.click();
  
  // Now, click the "Add" button
  const addButton = await this.page.locator(this.addButton);
  await addButton.waitFor({ state: 'visible' });
  await addButton.click();
  }

  // Method to upload a certificate
  async uploadCertificate(filePath: string) {
    // Wait for and select a certificate
    await this.page.locator(this.certificationDropdown).first().click();
    await this.page.locator(this.certificationLink).click();

    // Upload the file
    await this.page.locator(this.fileInputTextbox).setInputFiles(filePath);

    // Submit the form
    await this.page.locator(this.submitButton).click();
  }

  // Method to check the success message after submission
  async verifyRequestRecorded() {
 // Wait for the "request is recorded" message to appear (first toast)
  const toastLocator = this.page.locator(this.successMessage);
  await toastLocator.waitFor({ state: 'visible', timeout: 60000 }); // Wait for the toast message to appear

  // Click on the toast message or perform any other action if needed
  await toastLocator.click();

  // Wait for the "in process" validation message
  const validationMessageLocator = this.page.locator(this.validationMessage);
  
  // Wait for it to be visible within the given timeout
  await validationMessageLocator.waitFor({ state: 'visible', timeout: 60000 });

  // You can perform any interaction, for example, clicking on it, if needed
  await validationMessageLocator.click();
  }

}
