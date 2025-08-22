Feature: AI Response Verification
  As a user
  I want to verify AI-generated answers
  So I can help improve AI accuracy and earn rewards

  Scenario: Review an AI response
    Given I am presented with an AI-generated answer
    When I verify if the answer is correct
    Then I earn points for my contribution

  Scenario: Challenge an AI response
    Given I disagree with an AI answer
    When I submit a correction
    Then my feedback is recorded and I earn points
