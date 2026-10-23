def build_booking_payload():
    return {
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


def build_new_booking_payload():
    return {
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
