Feature: Interactivity and Gamification
  As a user
  I want interactive elements and rewards
  So that learning is engaging and motivating

  Scenario: Participating in an interactive activity
    Given the user is in a module
    When they engage in an activity (e.g., AI prompting exercise)
    Then real-time feedback is provided
    And on success, points are added

  Scenario: Earning badges and points
    Given the user completes a module
    When points reach a threshold
    Then a badge is unlocked
    And displayed in profile

  Scenario: Visual progress tracking
    Given the user is on landing or path page
    When progress updates
    Then progress bar or checklist reflects changes
    And motivational messages appear on milestones