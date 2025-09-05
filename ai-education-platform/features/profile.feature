Feature: Account Profile Page
  As a logged-in user
  I want to view and edit my profile
  So that I can manage my details and see achievements

  Scenario: Viewing profile details
    Given the user is logged in and on the profile page
    When the page loads
    Then user details (name, email) are displayed
    And earned points, badges, and progress summaries are shown

  Scenario: Editing profile information
    Given the user is on the profile page
    When the user edits their name
    And saves the changes
    Then the updated name is reflected
    And a success message is shown

  Scenario: Viewing achievements
    Given the user has completed some modules
    When the user views the profile
    Then badges and points are listed
    And a summary of completed paths is available