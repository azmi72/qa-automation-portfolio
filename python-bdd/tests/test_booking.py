from utils.api_client import (
    create_booking,
    get_booking_by_id
)

payload = {
    "firstname" : "Azmi",
    "lastname" : "Lupinsky",
    "totalprice" : 72,
    "depositpaid" : True,
    "bookingdates" : {
        "checkin" : "2026-10-02",
        "checkout" : "2026-10-07"
    },
    "additionalneeds" : "Breakfast"
}

def test_create_booking():
    response = create_booking(payload)
    data = response.json()
    booking_id = data["bookingid"]

    assert response.status_code == 200
    assert isinstance(booking_id, int)
    assert booking_id > 0
    assert data["booking"]["firstname"] == payload["firstname"]
    assert data["booking"]["totalprice"] == payload["totalprice"]

def test_get_booking_by_id():
    create_response = create_booking(payload)
    create_data = create_response.json()
    booking_id = create_data["bookingid"]

    response = get_booking_by_id(booking_id)

    assert response.status_code == 200
    assert isinstance(booking_id, int)
    assert booking_id > 0

def test_get_booking_data_by_id():
    create_response = create_booking(payload)
    create_data = create_response.json()
    booking_id = create_data["bookingid"]

    response = get_booking_by_id(booking_id)
    data = response.json()

    assert response.status_code == 200
    assert data == payload