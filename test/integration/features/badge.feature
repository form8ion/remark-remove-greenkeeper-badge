Feature: removal of the Greenkeeper badge

  Scenario: inline badge
    Given an inline greenkeeper badge exists
    When a node is processed
    Then the greenkeeper badge is removed from the README

  @wip
  Scenario: badge with referenced definitions
    Given a greenkeeper badge exists with referenced definitions
    When a node is processed
    Then the greenkeeper badge is removed from the README
