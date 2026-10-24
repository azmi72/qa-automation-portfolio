from utils.api_client import (
    delete_booking_by_id,
    create_token
)


def before_all(context):
    response = create_token()

    assert response.status_code == 200, f"Precondition failed: creating a token returned status code: {response.status_code}"
    assert response.json().get("token"), "Precondition failed: response has no token"

    context.token = response.json()["token"]


def before_scenario(context, scenario):
    context.booking_ids = []


def after_scenario(context, scenario):
    for booking_id in context.booking_ids:
        delete_booking_by_id(booking_id, context.token)

        print(f"Cleanup: booking id = {booking_id}")