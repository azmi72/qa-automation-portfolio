import pytest
from utils.api_client import (
    create_booking,
    create_token,
    delete_booking_by_id
)
from utils.booking_data import (
    build_booking_payload,
    build_new_booking_payload
)

@pytest.fixture(scope="session")
def token():
    body = create_token().json()

    assert "token" in body, f"Auth failed: {body}"
    return body["token"]

@pytest.fixture
def payload():
    return build_booking_payload()

@pytest.fixture
def new_payload():
    return build_new_booking_payload()

@pytest.fixture
def booking(token, payload):
    booking_id = create_booking(payload).json()["bookingid"]

    yield booking_id

    delete_booking_by_id(booking_id, token)

@pytest.fixture
def booking_ids_to_delete(token):
    booking_ids = []

    yield booking_ids

    for booking_id in booking_ids:
        delete_booking_by_id(booking_id, token)