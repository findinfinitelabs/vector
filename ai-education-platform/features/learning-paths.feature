Feature: Learning Paths
  As a beginner user
  I want structured learning paths
  So that I can build AI skills step-by-step

  Scenario: Navigating through a learning path
    Given the user selects a path (e.g., AI Governance)
    When the path loads
    Then modules are displayed in sequence
    And the user can complete activities to advance

  Scenario: Completing a module activity
    Given the user is in a module
    When they complete an activity (e.g., quiz)
    And submit correct answers
    Then points are awarded
    And progress is updated
    And the next module unlocks

  Scenario: Unlocking milestones
    Given the user accumulates enough points
    When a milestone is reached
    Then a badge is awarded
    And a celebration animation plays
    And advanced content unlocks