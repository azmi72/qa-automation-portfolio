import requests

BASE_URL = "https://restful-booker.herokuapp.com"

def get_ping():
    response = requests.get(BASE_URL + "/ping")
    return response

def get_booking():
    response = requests.get(BASE_URL + "/booking")
    return response

def ping_status():
    response = get_ping()
    return response.status_code

def total_booking():
    response = get_booking()
    data = response.json()
    code = response.status_code
    total = len(data)
    return code, total


if __name__ == "__main__":
    print(f"Ping status: {ping_status()}")

    code, total = total_booking()
    print(f"Status code: {code}, total bookings: {total}")