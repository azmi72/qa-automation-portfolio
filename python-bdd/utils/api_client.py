import requests

BASE_URL = "https://restful-booker.herokuapp.com"
GET_PING_URL = BASE_URL + "/ping"
GET_BOOKING_URL = BASE_URL + "/booking"
GET_BOOKING_BY_ID_URL = GET_BOOKING_URL + "/"

def get_ping():
    response = requests.get(GET_PING_URL)
    return response

def get_booking():
    response = requests.get(GET_BOOKING_URL)
    return response

def create_booking(payload):
    response = requests.post(GET_BOOKING_URL, json=payload)
    return response

def get_booking_by_ids(booking_id):
    response = requests.get(GET_BOOKING_BY_ID_URL + str(booking_id))
    return response