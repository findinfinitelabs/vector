Feature: Landing Page
  As a logged-in user
  I want to see an overview of learning paths and my progress
  So that I can start or continue my AI education journey

  Scenario: View landing page as unauthenticated user
    Given the user is not logged in
    When the user visits the app
    Then they see a public homepage with app overview
    And a prompt to log in or sign up

  Scenario: Personalized landing page for logged-in user
    Given the user is logged in
    When the user navigates to the landing page
    Then they see their progress bar
    And a list of available learning paths with status (e.g., Start, Continue, Locked)
    And personalized greetings

  Scenario: Selecting a learning path
    Given the user is on the landing page
    When the user clicks on a path (e.g., "Becoming a Data Scientist with AI")
    Then they are redirected to the LearningPathPage for that path
    And the path's modules are loaded