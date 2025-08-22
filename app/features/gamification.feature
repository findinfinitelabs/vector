Feature: Gamification and Rewards
  As a user
  I want to earn points and rewards for my actions
  So I stay motivated and engaged while learning

  Scenario: Earn points for completing a lesson
    Given I complete an AI lesson
    When I finish the lesson
    Then I receive points added to my account

  Scenario: Redeem points for rewards
    Given I have earned points
    When I choose to redeem my points
    Then I can select a reward and receive it
