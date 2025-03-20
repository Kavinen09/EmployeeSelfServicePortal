Feature: Employee Login

    @positive
    Scenario: Employee logs into the Employee Self-Service Portal
        Given the employee is on the login page
        When the employee enters valid credentials
        And the employee click on sign in button
        Then the employee should be redirected to the homepage
        And the employee navigates to the add certificate page
        And the employee uploads a certificate
        Then the employee should see the request recorded message



