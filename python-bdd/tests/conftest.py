import pytest

from utils.api_client import (
    create_booking, 
    create_token, 
    delete_booking_by_id
)

@pytest.fixture(scope="session")
def token():
    body = create_token().json()

    assert "token" in body, f"Auth failed: {body}"
    return body["token"]

@pytest.fixture
def payload():
    payload = {
        "firstname": "Azmi",
        "lastname": "Lupinsky",
        "totalprice": 72,
        "depositpaid": True,
        "bookingdates": {
            "checkin": "2026-10-02",
            "checkout": "2026-10-07"
        },
        "additionalneeds": "Breakfast"
    }

    return payload

@pytest.fixture
def new_payload():
    new_payload = {
        "firstname": "Sasuke",
        "lastname": "Uchiha",
        "totalprice": 1,
        "depositpaid": True,
        "bookingdates": {
            "checkin": "2026-11-02",
            "checkout": "2026-11-07"
        },
        "additionalneeds": "Pool"
    }

    return new_payload

@pytest.fixture
def booking(token, payload):
    booking_id = create_booking(payload).json()["bookingid"]

    yield booking_id

    delete_booking_by_id(booking_id, token)