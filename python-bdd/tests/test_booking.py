from utils.api_client import (
    create_booking,
    get_booking_by_id,
    update_booking_by_id,
    partially_update_booking_by_id,
    delete_booking_by_id
)

def test_create_booking(payload, booking_ids_to_delete):
    response = create_booking(payload)

    assert response.status_code == 200

    data = response.json()
    booking_id = data["bookingid"]
    booking_ids_to_delete.append(booking_id)

    assert isinstance(booking_id, int)
    assert booking_id > 0
    assert data["booking"]["firstname"] == payload["firstname"]
    assert data["booking"]["totalprice"] == payload["totalprice"]


def test_get_booking_data_by_id(booking, payload):
    response = get_booking_by_id(booking)

    assert response.status_code == 200
    assert response.json() == payload

def test_update_booking_by_id(booking, payload, new_payload, token):
    response = get_booking_by_id(booking)

    assert response.status_code == 200
    assert response.json() == payload

    updated_response = update_booking_by_id(booking, new_payload, token)

    assert updated_response.status_code == 200
    assert updated_response.json() == new_payload

    new_response = get_booking_by_id(booking)

    assert new_response.status_code == 200
    assert new_response.json() == new_payload


def test_partially_update_booking_by_id(booking, payload, token):
    partial_payload = {"firstname": "Itachi"}

    response = get_booking_by_id(booking)

    assert response.status_code == 200
    assert response.json() == payload

    partial_update_response = partially_update_booking_by_id(booking, partial_payload, token)

    assert partial_update_response.status_code == 200
    assert partial_update_response.json()["firstname"] == partial_payload["firstname"]

    new_response = get_booking_by_id(booking)

    assert new_response.status_code == 200
    assert new_response.json()["firstname"] == partial_payload["firstname"]


def test_delete_booking_by_id(booking, token):
    response = delete_booking_by_id(booking, token)

    assert response.status_code == 201

    get_response = get_booking_by_id(booking)

    assert get_response.status_code == 404
    assert get_response.text == "Not Found"


def test_update_booking_without_token(booking, payload, new_payload):
    response = get_booking_by_id(booking)

    assert response.status_code == 200
    assert response.json() == payload

    updated_response = update_booking_by_id(booking, new_payload, None)

    assert updated_response.status_code == 403
    assert updated_response.text == "Forbidden"

    new_response = get_booking_by_id(booking)

    assert new_response.status_code == 200
    assert new_response.json() == payload


def test_get_booking_by_invalid_id():
    invalid_booking_id = 0

    response = get_booking_by_id(invalid_booking_id)

    assert response.status_code == 404
    assert response.text == "Not Found"