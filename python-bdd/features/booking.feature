Feature: Booking management

    @positive @smoke
    Scenario: Create a new booking with a valid payload
        Given I have a valid booking payload
        When I send a request to create the booking
        Then the response status should be 200
        And the booking id should exist
        And the created booking should match the payload

    @positive
    Scenario: Get booking details with a valid id
        Given a booking exists
        When I send a request to get the booking
        Then the response status should be 200
        And the booking details should match the payload

    @positive
    Scenario: Delete a booking with a valid id
        Given a booking exists
        And I have a valid token
        When I send a request to delete the booking
        Then the response status should be 201
        And the booking should no longer exist

    @negative
    Scenario Outline: Create a new booking with <condition>
        Given I have <condition>
        When I send a request to create the booking
        Then the response status should be <status_code>
        And the response message should be <message>

        Examples: Invalid payload
            | condition                             | status_code | message                  |
            | an empty booking payload              | 500         | Internal Server Error    |
            | a booking payload without firstname   | 500         | Internal Server Error    |