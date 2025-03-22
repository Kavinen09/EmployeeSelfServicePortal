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
        #Login again as a manager
        Given the manager is on the login page
        When the manager fills the login form with valid manager credentials
        And the manager clicks the sign-in button
        Then the manager should see that the page title is "SD Worx"
        # Manager approves the certification request
        When the manager clicks on the My Tasks menu
        Then the manager clicks on the first task row
        And the manager types in the comment box with the text "Certification Valid. Request approve."
        And the manager clicks the Approve button
        Then the request should be approved successfully
        # Manager signs out and logs in again as HR
        When the manager clicks the sign-out button
        Then the manager should be redirected to the login page
        When the HR user is on the login page
        And the HR user fills the login form with valid HR credentials
        And the HR user clicks the sign-in button
        Then the HR user should see that the page title is "SD Worx"
        # HR user receives a notification for manager approval
        Given the HR user hover on the notifications bell
        And the HR user clicks on the first notification
        Then the HR user should see the notification with the title "Changes in Certifications for KvnTest Emp were approved"
        Then the HR user should see the notification with the message "The request was approved by KvnTest Man with the following comment: Certification Valid. Request approve."
        Then the HR user clicks the sign-out button
        And the HR user should be redirected correctly to the login page
        #Login again as an employee
        When the employee fills the login form with valid credentials
        And the employee clicks the sign-in button
        Then the employee should see that the page title is "SD Worx"
        Given the employee hover on the notifications bell
        And the employee clicks on the first notification
        Then the employee should see the notification with the title "Changes in Certifications for KvnTest Emp were approved"
        Then the employee should see the notification with the message "The request was approved by KvnTest Man with the following comment: Certification Valid. Request approve."
        And the employee navigates to the add certifications page
        Then the employee should see certificate is present