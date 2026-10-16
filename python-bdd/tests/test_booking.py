from utils.api_client import (
    get_ping,
    get_booking,
    create_booking,
    get_booking_by_ids
)

def test_create_booking():
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

    response = create_booking(payload)
    print(response.json())

    assert response.status_code == 200
    assert response.json()["bookingid"] != ""
