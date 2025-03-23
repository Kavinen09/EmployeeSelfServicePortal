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
  private validFileName = 'label:has-text("negativeGP.jpg")'; // File name displayed after "File saved"
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

// Locators for employee
  private empNotificationBell = '[test-id="navbar-notifications"]'; // Notifications bell icon
  private firstEmployeeNotificationItem  = '.dropdown-menu .sl-item:nth-child(1) .sl-content .pointer'; // First notification item 
  private empNotificationTitle = '.notifications-list .notification-title'; // Locator for the title of the notification
  private empNotificationMessage = '.notifications-list .notification:first-of-type .notification-description'; // Locator for the message


  private declineButton = 'button[test-id="Decline"]';
// Locator for the server error modal
private serverErrorModal = '.modal-dialog .modal-content'; 
// Locator for the server error message
private errorMessageLocator = '.modal-body .font-weight-bold'; // "Oops, something went wrong"
// Locator for the OK button in the server error modal
private okButtonLocator = '.modal-footer button.btn-primary'; 


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


  // Method to upload a certificate
  async uploadValidCertificate(filePath: string) {
    await this.page.locator(this.certificationDropdown).first().click();
    await this.page.locator(this.certificationLink).click();
    await this.page.locator(this.fileInputTextbox).setInputFiles(filePath);

    const fileSavedLocator = this.page.locator(this.fileSavedMessage);
    await fileSavedLocator.waitFor({ state: 'visible', timeout: 60000 });
    await fileSavedLocator.waitFor({ state: 'detached' });

    const fileNameLocator = this.page.locator(this.validFileName);
    await fileNameLocator.waitFor({ state: 'visible', timeout: 60000 });

    await this.page.locator(this.submitButton).click();
  }

  // Method to verify that the file name is displayed
  async verifyValidFileNameDisplayed(expectedFileName: string) {
    const fileNameLocator = this.page.locator(`label:has-text("${expectedFileName}")`);
    await fileNameLocator.waitFor({ state: 'visible', timeout: 60000 });
  }
  // Method to check the success message after submission
  async verifyValidRequestRecorded() {
    const toastLocator = this.page.locator(this.successMessage);
    await toastLocator.waitFor({ state: 'visible', timeout: 60000 });

    const validationMessageLocator = this.page.locator(this.validationMessage);
    await validationMessageLocator.waitFor({ state: 'visible', timeout: 60000 });
  }

async uploadCertificateExceedingSizeLimit(filePath: string) {
   // Click on the certification dropdown
    await this.page.locator(this.certificationDropdown).first().click();
    
    // Click on the certification link
    await this.page.locator(this.certificationLink).click();
    
    // Upload the file that exceeds the maximum size limit (5MB)
    await this.page.locator(this.fileInputTextbox).setInputFiles(filePath);

    // Wait for the modal with "Server error" to be visible
    const serverErrorModalLocator = this.page.locator('.modal-title:has-text("Server error")');  // Locator for the modal title
    
    try {
        // Wait for the modal to appear (timeout 60 seconds)
        await serverErrorModalLocator.waitFor({ state: 'visible', timeout: 60000 });
        console.log("Server error modal is visible.");

        // Get the actual error message
        const errorMessageLocator = this.page.locator('.modal-body .font-weight-bold');
        const actualErrorMessage = await errorMessageLocator.innerText();

        // Assert that the actual error message contains "Oops, something went wrong"
        expect(actualErrorMessage).toContain('Oops, something went wrong');  // Updated to match the error message

        // No need to click OK, simply stop here.
        console.log("Test stops here after verifying the server error.");
    } catch (error) {
        console.error("Error: Server error modal did not appear within the timeout.");
        throw error;
    }
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
    const firstTaskRowLocator = this.page.locator(this.firstTaskRow).first();
    await firstTaskRowLocator.click(); // Click on the first task row
  }

  // Method to fill the comment box
  async fillCommentBox(commentText: string) {
    const commentBoxLocator = this.page.locator(this.commentBox);
    await commentBoxLocator.fill(commentText); // Fill the comment box with the provided text
  }

  // Method to clear the comment box (leave it empty)
async clearCommentBox() {
  const commentBoxLocator = this.page.locator(this.commentBox);
  await commentBoxLocator.fill('');  // Clear the comment box
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

  async clickDeclineButton() {
  const declineButtonLocator = this.page.locator(this.declineButton);
  await declineButtonLocator.click();  // Click the decline button
  }
  
   // Method to verify that the decline action was successful
  async verifyDeclineSuccess() {
    const successMessageLocator = this.page.locator('div.toast-message:has-text("You successfully completed the task.")'); // Update with actual success message locator
    await successMessageLocator.waitFor({ state: 'visible', timeout: 30000 });

    const successMessageText = await successMessageLocator.textContent();

    // Assert that the success message contains "You declined the task."
    expect(successMessageText).toBeTruthy();
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


  // Method to verify the notification title (Negative Flow)
async isNegativeNotificationWithTitleVisible(expectedTitle: string) {
    const titleLocator = this.page.locator(this.notificationTitle);
    await titleLocator.waitFor({ state: 'visible', timeout: 15000 }); // Wait for the title to appear
    const actualTitle = await titleLocator.innerText();
    expect(actualTitle).toBe(expectedTitle); // Assert the title matches the expected value
}

// Method to verify the notification body (Negative Flow)
async verifyNegativeNotificationBody(expectedMessage: string) {
    // Locate the first (latest) notification
    const latestNotification = this.page.locator('.notifications-list .notification-description').first();
    
    // Wait for the latest notification to be visible
    await latestNotification.waitFor({ state: 'visible', timeout: 20000 });
    
    // Get the actual message text from the latest notification
    const actualMessage = await latestNotification.textContent();
    
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
    
    // Log the cleaned actual message for debugging purposes (optional)
    console.log(`Cleaned actual notification body: ${cleanedMessage}`);
    
    // Assert that the actual cleaned message contains the expected decline comment
    expect(cleanedMessage).toContain('The request was declined by KvnTest Man');
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

    async hoverOverEmpNotificationBell(){
    const bell = this.page.locator(this.empNotificationBell);
    await bell.waitFor({ state: 'visible', timeout: 15000 }); // Wait for bell to appear
    await bell.hover(); // Hover to show the notification dropdown

    // Optional: Wait for the dropdown to appear
    await this.page.waitForTimeout(500); // Wait half a second for dropdown to appear
  }
  

  async clickFirstEmployeeNotification() {
    const firstNotification = this.page.locator(this.firstEmployeeNotificationItem );
    await firstNotification.waitFor({ state: 'visible', timeout: 15000 }); // Wait for first notification to appear
    await firstNotification.click(); // Click the first notification

    // Wait for the notification details to load
    const notificationDetailsLocator = '.notificationDetails'; // Adjust the locator if needed
    await this.page.locator(notificationDetailsLocator).waitFor({ state: 'visible', timeout: 15000 });
  }

  // Method to check if the notification with the expected title is visible
  async isEmployeeNotificationWithTitleVisible(expectedTitle: string) {
     // Locate the first notification title (use .first() to select the first element)
  const notificationTitle = this.page.locator('.notifications-list .notification-title').first();

  // Wait for the notification to be visible
  await notificationTitle.waitFor({ state: 'visible', timeout: 20000 });

  // Get the title text and trim it
  const actualTitle = await notificationTitle.textContent();

  // Normalize spaces (replace multiple spaces with a single space)
  const normalizedActualTitle = actualTitle?.replace(/\s+/g, ' ').trim();

  // Normalize the expected title in the same way
  const normalizedExpectedTitle = expectedTitle.replace(/\s+/g, ' ').trim();

  // Assert that the normalized actual title matches the normalized expected title
  expect(normalizedActualTitle).toBe(normalizedExpectedTitle);
  }

  // Method to verify the notification body content for the employee
  async verifyEmployeeNotificationBody(expectedMessage: string) {
    // Locate the first (latest) notification
    const latestNotification = this.page.locator(this.empNotificationMessage).first();
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

  // Method to check if the notification with the expected title is visible
  async isEmployeeNegativeNotificationWithTitleVisible(expectedTitle: string) {
     // Locate the first notification title (use .first() to select the first element)
  const notificationTitle = this.page.locator('.notifications-list .notification-title').first();

  // Wait for the notification to be visible
  await notificationTitle.waitFor({ state: 'visible', timeout: 20000 });

  // Get the title text and trim it
  const actualTitle = await notificationTitle.textContent();

  // Normalize spaces (replace multiple spaces with a single space)
  const normalizedActualTitle = actualTitle?.replace(/\s+/g, ' ').trim();

  // Normalize the expected title in the same way
  const normalizedExpectedTitle = expectedTitle.replace(/\s+/g, ' ').trim();

  // Assert that the normalized actual title matches the normalized expected title
  expect(normalizedActualTitle).toBe(normalizedExpectedTitle);
  }

  // Method to verify the notification body content for the employee
  async verifyNegativeEmployeeNotificationBody(expectedMessage: string) {
    // Locate the first (latest) notification
    const latestNotification = this.page.locator(this.empNotificationMessage).first();
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
    expect(cleanedMessage).toContain('The request was declined by KvnTest Man');
  }





  // Method to navigate to the Add Certifications page
  async navigateToAddCertificationsPage() {
    // Locate and click the button or link to navigate to the Add Certifications page
    const addCertificationsButton = this.page.locator('button[title="Add Certifications"]'); // Adjust locator as needed
    await addCertificationsButton.waitFor({ state: 'visible', timeout: 15000 });
    await addCertificationsButton.click();
    
    // Wait for the Add Certifications page to load
    const addCertificationsPageLocator = '.add-certifications-page'; // Adjust locator as needed
    await this.page.locator(addCertificationsPageLocator).waitFor({ state: 'visible', timeout: 15000 });
  }

 // Method to verify that at least one certification is present
    async verifyCertificationIsPresent() {
   // Locate the certification data card element containing the certification text
  const certificateLocator = this.page.locator('gp-contract-data-card .box-body .form-group ._500');
  
  // Wait for the first certification text to be visible (adjust timeout as needed)
  await certificateLocator.first().waitFor({ state: 'visible', timeout: 15000 });
  
  // Assert that the certification text is not empty
  const certificationText = await certificateLocator.first().innerText();
  expect(certificationText).not.toBe(''); // Ensure certification text is present
  
  // Optionally: You can also check if it contains a specific certification name
  const expectedCertificationText = "Certification 1 (Driving licence)"; // Update with the expected certification text
  expect(certificationText).toContain(expectedCertificationText); // Verify it contains expected text
  }

   // Method to verify that at least one certification is present
    async verifyCertificationIsNotPresent(imageName: string) {
   // Locate the label that contains the image name (file name displayed after "File saved")
  const imageLocator = this.page.locator(`label:has-text("${imageName}")`);

  // Check the count of elements matching the locator to ensure the image is not present
  const imageCount = await imageLocator.count(); // Get the count of elements matching the image locator
  
  // Assert that the image is not present (i.e., count should be 0)
  expect(imageCount).toBe(0); // If count is 0, the image is not present, which is what we want

  }

}