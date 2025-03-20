// import { Given, When, Then } from '@cucumber/cucumber';
// import { expect } from '@playwright/test';
// import { PracticeFormNegativePage } from '../pages/PracticeFormNegativePage'; // Correct relative path
// import { Page } from 'playwright';

// let page: Page;
// let practiceFormNegativePage: PracticeFormNegativePage;

// Given('the user on the "Practice Form" page at {string}', async function (url: string) {
//   // Navigate to the form page
//   await this.page.goto(url, { 
//     timeout: 60000, 
//     waitUntil: 'domcontentloaded' 
//   });

//   // Instantiate the PracticeFormNegativePage object
//   practiceFormNegativePage = new PracticeFormNegativePage(this.page);
// });

// When('the user leaves First Name, Last Name, Gender and Mobile blank', async function () {
//   const formData = {
//     firstName: '', // Leave blank
//     lastName: '', // Leave blank
//     email: 'john.doe@example.com',
//     gender: '', // Leave blank
//     mobile: '', // Leave blank
//     dateOfBirth: '2025-03-21',
//     subject: 'Computer Science',
//     hobby: '1', // Sports
//     picture: 'C:/Users/sd273019/Downloads/doggie.jpg',
//     address: '123 Main St'
//   };

//   // Fill in the form with missing mandatory fields (First Name, Last Name, Gender, Mobile)
//   await practiceFormNegativePage.fillForm(formData);
// });

// When('the user submit the form', async function () {
//   // Submit the form
//   await practiceFormNegativePage.submitForm();
// });

// Then('the form should not be submitted', async function () {
//   // Verify the form wasn't submitted (check for submission confirmation or absence)
//   await practiceFormNegativePage.verifyFormNotSubmitted();
// });

// Then('the First Name field should have a red border', async function () {
//   // Check if the First Name field has a red border
//   const firstNameFieldError = await practiceFormNegativePage.checkFirstNameFieldError();
//   expect(firstNameFieldError).toBe(true); // Expect red border for First Name
// });

// Then('the Last Name field should have a red border', async function () {
//   // Check if the Last Name field has a red border
//   const lastNameFieldError = await practiceFormNegativePage.checkLastNameFieldError();
//   expect(lastNameFieldError).toBe(true); // Expect red border for Last Name
// });

// Then('the Gender field should have a red border', async function () {
//   // Check if the Gender field has a red border (check if no gender is selected)
//   const genderFieldError = await practiceFormNegativePage.checkGenderFieldError();
//   expect(genderFieldError).toBe(true); // Expect red border for Gender
// });

// Then('the Mobile field should have a red border', async function () {
//   // Check if the Mobile field has a red border
//   await this.page.waitForSelector('#userNumber', { timeout: 5000 });  // Ensure it's ready
//   const mobileFieldError = await practiceFormNegativePage.checkMobileFieldError();
//   expect(mobileFieldError).toBe(true); // Expect red border for Mobile
// });
