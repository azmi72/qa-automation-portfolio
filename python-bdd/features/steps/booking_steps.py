from behave import given, when, then
from utils.api_client import (
    create_booking,
    get_booking_by_id,
    delete_booking_by_id,
    create_token
)
from utils.booking_data import (
    build_booking_payload
)

### GIVEN ###

@given("I have a valid booking payload")
def step_prepare_booking_payload(context):
    context.payload = build_booking_payload()


@given("a booking exists")
def step_booking_exists(context):
    context.payload = build_booking_payload()
    response = create_booking(context.payload)

    assert response.status_code == 200, f"Precondition failed: create booking returned status code: {response.status_code}"

    context.booking_id = response.json()["bookingid"]


@given("I have a valid token")
def step_get_valid_token(context):
    response = create_token()

    assert response.status_code == 200, f"Precondition failed: create token returned status code: {response.status_code}"
    assert response.json().get("token"), "Precondition failed: response has no token"

    context.token = response.json()["token"]


### WHEN ###

@when("I send a request to create the booking")
def step_create_booking(context):
    context.response = create_booking(context.payload)


@when("I send a request to get the booking")
def step_get_booking(context):
    context.response = get_booking_by_id(context.booking_id)


@when("I send a request to delete the booking")
def step_delete_booking(context):
    context.response = delete_booking_by_id(context.booking_id, context.token)


### THEN ###

@then("the response status should be {status:d}")
def step_check_status_code(context, status):
    assert context.response.status_code == status, f"Postcondition failed: status code {context.response.status_code}"


@then("the booking id should exist")
def step_check_booking_id(context):
    booking_id = context.response.json()["bookingid"]

    assert isinstance(booking_id, int)
    assert booking_id > 0


@then("the created booking should match the payload")
def step_check_created_booking_response(context):
    booking = context.response.json()["booking"]

    assert booking == context.payload


@then("the booking details should match the payload")
def step_check_booking_details(context):
    booking = context.response.json()

    assert booking == context.payload


@then("the booking should no longer exist")
def step_check_booking_no_longer_exists(context):
    get_response = get_booking_by_id(context.booking_id)

    assert get_response.status_code == 404, f"Postcondition failed: get booking returned status code: {get_response.status_code}"
    assert get_response.text == "Not Found", f"Postcondition failed: get booking returned message: {get_response.text}"