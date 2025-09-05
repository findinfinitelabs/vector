Feature: User Authentication
  As a user with zero AI knowledge
  I want to securely log in to the app
  So that I can access personalized learning content

  Scenario: Successful login with email and password
    Given the user is on the login page
    When the user enters valid email and password
    And clicks the login button
    Then the user is redirected to the landing page
    And a session token is stored

  Scenario: Failed login with invalid credentials
    Given the user is on the login page
    When the user enters invalid email or password
    And clicks the login button
    Then an error message "Invalid credentials" is displayed
    And the user remains on the login page

  Scenario: Login with Google OAuth
    Given the user is on the login page
    When the user clicks "Sign in with Google"
    Then the user is redirected to Google's auth page
    And on successful auth, redirected back to landing page with session

  Scenario: Logout functionality
    Given the user is logged in and on the landing page
    When the user clicks the logout button in the navbar
    Then the session is cleared
    And the user is redirected to the login page