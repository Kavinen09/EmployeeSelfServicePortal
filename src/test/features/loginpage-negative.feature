# Feature: Negative form submission on DemoQA

#     @Negative
#     Scenario: Mandatory Fields (First Name, Last Name, Gender and Mobile)
#         Given the user on the "Practice Form" page at "https://demoqa.com/automation-practice-form"
#         When the user leaves First Name, Last Name, Gender and Mobile blank
#         And the user submit the form
#         Then the form should not be submitted
#         And the First Name field should have a red border
#         And the Last Name field should have a red border
#         And the Gender field should have a red border
#         And the Mobile field should have a red border
