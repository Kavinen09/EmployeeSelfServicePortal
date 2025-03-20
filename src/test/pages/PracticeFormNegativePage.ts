import { Page } from 'playwright';

export class PracticeFormNegativePage {
  constructor(private page: Page) {}

  // Fill out the form fields with the provided data
  async fillForm(formData: { [key: string]: string }) {
    // Fill out the form fields with the provided data
    await this.page.fill('#firstName', formData.firstName);
    await this.page.fill('#lastName', formData.lastName);

    // Gender field
    await this.selectGender(formData.gender);

    // Wait for the mobile input field to be available before filling
    await this.page.waitForSelector('#userNumber', { timeout: 5000 });  // Ensure it is ready
    await this.page.fill('#userNumber', formData.mobile);  // Use #userNumber based on positive test
  }

  // Method to select gender radio button (Male, Female, Other)
  private async selectGender(gender: string) {
    if (gender === 'Male') {
      await this.page.check('#gender-radio-1');
    } else if (gender === 'Female') {
      await this.page.check('#gender-radio-2');
    } else if (gender === 'Other') {
      await this.page.check('#gender-radio-3');
    }
  }

  // Submit the form (assuming there's a submit button with the id 'submit')
  async submitForm() {
    await this.page.click('#submit');
  }

  // Verify if the form was not submitted successfully (checking if modal is hidden)
  async verifyFormNotSubmitted() {
    // check for any modal, alert, or other elements that would appear upon submission
    await this.page.waitForSelector('.modal-content', { state: 'hidden', timeout: 5000 });
  }

  // Check if the First Name field has turned red (invalid)
  async checkFirstNameFieldError() {
    const firstNameField = await this.page.$('#firstName');
    if (!firstNameField) {
      console.error('First Name field not found');
      return false;
    }
    // Check if the field is invalid (using the :invalid pseudo-class)
    const isInvalid = await firstNameField.evaluate(el => (el as HTMLInputElement).validity.valid === false);
    return isInvalid; // Return true if the field is invalid
  }

  // Check if the Last Name field has turned red (invalid)
  async checkLastNameFieldError() {
    const lastNameField = await this.page.$('#lastName');
    if (!lastNameField) {
      console.error('Last Name field not found');
      return false;
    }

    const isInvalid = await lastNameField.evaluate(el => (el as HTMLInputElement).validity.valid === false);
    return isInvalid;
  }

  // Check if the Gender field has turned red (invalid)
  async checkGenderFieldError() {
    const genderRadios = await this.page.$$('[name="gender"]');
    for (let radio of genderRadios) {
      const isInvalid = await radio.evaluate(el => (el as HTMLInputElement).validity.valid === false);
      if (isInvalid) {
        return true; // Return true if any of the gender radio buttons are invalid
      }
    }
    return false; // Return false if none of the gender fields are invalid
  }

  // Check if the Mobile field has turned red (invalid)
  async checkMobileFieldError() {
    const mobileField = await this.page.$('#userNumber');
    if (!mobileField) {
      console.error('Mobile field not found');
      return false;
    }

    const isInvalid = await mobileField.evaluate(el => (el as HTMLInputElement).validity.valid === false);
    return isInvalid;
  }
}
