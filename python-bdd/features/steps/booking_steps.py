from behave import given, when, then
from utils.api_client import (
    create_booking,
    get_booking_by_id,
    delete_booking_by_id
)
from utils.booking_data import (build_booking_payload)


@given("I have a valid booking payload")
def step_prepare_booking_payload(context):
    context.payload = build_booking_payload()


@when("I send a request to create the booking")
def step_create_booking(context):
    context.response = create_booking(context.payload)


@then("the response status should be {status:d}")
def step_check_status_code(context, status):
    assert context.response.status_code == status