Feature: User Login
  As a new user
  I want to log in with my preferred method
  So I can start learning about AI and earn rewards

  Scenario: Login with Google
    Given I am on the login page
    When I select "Google" and provide my credentials
    Then I am logged in and see my progress

  Scenario: Login with username and password
    Given I am on the login page
    When I enter a username and password
    Then I am logged in and see my progress
