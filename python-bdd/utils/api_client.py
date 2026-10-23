import requests

# URL
BASE_URL = "https://restful-booker.herokuapp.com"
PING_URL = BASE_URL + "/ping"
BOOKING_URL = BASE_URL + "/booking"
BOOKING_BY_ID_URL = BOOKING_URL + "/"
AUTH_URL = BASE_URL + "/auth"

# CREDENTIALS
CREDENTIALS = {"username": "admin", "password": "password123"}


def get_ping():
    response = requests.get(PING_URL)
    return response


def get_bookings():
    response = requests.get(BOOKING_URL)
    return response


def create_booking(payload):
    response = requests.post(BOOKING_URL, json=payload)
    return response


def get_booking_by_id(booking_id):
    response = requests.get(BOOKING_BY_ID_URL + str(booking_id))
    return response


def update_booking_by_id(booking_id, payload, token=None):
    headers = build_auth_headers(token)
    response = requests.put(BOOKING_BY_ID_URL + str(booking_id), json=payload, headers=headers)
    return response


def partially_update_booking_by_id(booking_id, payload, token=None):
    headers = build_auth_headers(token)
    response = requests.patch(BOOKING_BY_ID_URL + str(booking_id), json=payload, headers=headers)
    return response


def delete_booking_by_id(booking_id, token=None):
    headers = build_auth_headers(token)
    response = requests.delete(BOOKING_BY_ID_URL + str(booking_id), headers=headers)
    return response


def create_token(credentials=CREDENTIALS):
    response = requests.post(AUTH_URL, json=credentials)
    return response


def build_auth_headers(token):
    if token is None:
        headers = None
    else:
        headers = {"Cookie": f"token={token}"}

    return headers