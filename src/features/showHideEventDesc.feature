Feature: Show/Hide Event Descriptions


Scenario: Event description is hidden by default

Given an Event component is rendered
Then the event details should be hidden
And the "show details" button should be displayed


Scenario: User can show event description

Given an Event component is rendered
And the event details are hidden
When the user clicks on the "show details" button
Then the event details should be displayed


Scenario: User can hide event description

Given an Event component is rendered
And the event details are displayed
When the user clicks on the "hide details" button
Then the event details should be hidden
