import requests

# URL
BASE_URL = "https://restful-booker.herokuapp.com"
PING_PATH = "/ping"
BOOKING_PATH = "/booking"
BOOKING_BY_ID_PATH = "/booking/"
AUTH_PATH = "/auth"

# CREDENTIALS
CREDENTIALS = {"username": "admin", "password": "password123"}


def get_ping():
    response = requests.get(build_url(PING_PATH))
    return response


def get_bookings():
    response = requests.get(build_url(BOOKING_PATH))
    return response


def create_booking(payload):
    response = requests.post(build_url(BOOKING_PATH), json=payload)
    return response


def get_booking_by_id(booking_id):
    response = requests.get(build_url(BOOKING_BY_ID_PATH) + str(booking_id))
    return response


def update_booking_by_id(booking_id, payload, token=None):
    headers = build_auth_headers(token)
    response = requests.put(build_url(BOOKING_BY_ID_PATH) + str(booking_id), json=payload, headers=headers)
    return response


def partially_update_booking_by_id(booking_id, payload, token=None):
    headers = build_auth_headers(token)
    response = requests.patch(build_url(BOOKING_BY_ID_PATH) + str(booking_id), json=payload, headers=headers)
    return response


def delete_booking_by_id(booking_id, token=None):
    headers = build_auth_headers(token)
    response = requests.delete(build_url(BOOKING_BY_ID_PATH) + str(booking_id), headers=headers)
    return response


def create_token(credentials=CREDENTIALS):
    response = requests.post(build_url(AUTH_PATH), json=credentials)
    return response


def build_auth_headers(token):
    if token is None:
        headers = None
    else:
        headers = {"Cookie": f"token={token}"}

    return headers


def set_base_url(url):
    global BASE_URL
    BASE_URL = url


def build_url(path):
    url = BASE_URL + path

    return url