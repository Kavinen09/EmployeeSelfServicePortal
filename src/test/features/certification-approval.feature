Feature: Certification Approval

    @positive
    Scenario: Certification Validation and Approval Process
        Given the employee is on the login page
        When the employee fills the login form with valid credentials
        And the employee clicks the sign-in button
        Then the employee should see that the page title is "SD Worx"
        And the employee navigates to the add certifications page
        And the employee uploads a certificate
        Then the employee should see the request recorded message
        Then the employee clicks the sign-out button
        And the employee should be redirected correctly to the login page