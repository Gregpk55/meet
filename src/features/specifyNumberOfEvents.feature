Feature: Number of Events

  Scenario: User can update the number of events
    Given the Number of Events component is rendered
    Then the default number of events is 32
    When the user enters a new value in the input field
    Then the events list should update with the specified number of events
