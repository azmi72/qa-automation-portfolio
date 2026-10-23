Feature: Booking management

    @smoke
    Scenario: Create a new booking with a valid payload
        Given I have a valid booking payload
        When I send a request to create the booking
        Then the response status should be 200
        And the booking id should exist
        And the response body should be the same as the payload

    Scenario: Get a booking details with a valid id
        Given I have a booking with a valid payload
        When I send a request to get the booking
        Then the response status should be 200
        And the response body should be same as the payload

    Scenario: Delete a booking with a valid id
        Given I have a booking with a valid payload
        And I have a valid token
        When I send a request to delete the booking
        Then the response status should be 201
        Then the booking should no longer exist