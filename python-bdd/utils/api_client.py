import requests

BASE_URL = "https://restful-booker.herokuapp.com"
PING_URL = BASE_URL + "/ping"
BOOKING_URL = BASE_URL + "/booking"
BOOKING_BY_ID_URL = BOOKING_URL + "/"

def get_ping():
    response = requests.get(PING_URL)
    return response

def get_booking():
    response = requests.get(BOOKING_URL)
    return response

def create_booking(payload):
    response = requests.post(BOOKING_URL, json=payload)
    return response

def get_booking_by_id(booking_id):
    response = requests.get(BOOKING_BY_ID_URL + str(booking_id))
    return response