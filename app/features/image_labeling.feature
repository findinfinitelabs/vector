Feature: Image Labeling
  As a user
  I want to label images to help train AI
  So I can learn and contribute to better AI models

  Scenario: Label an image
    Given I am logged in
    When I select an image to label
    Then I can choose the correct label and submit

  Scenario: Review AI-labeled images
    Given I am labeling images
    When I review an image labeled by AI
    Then I can verify or correct the label
