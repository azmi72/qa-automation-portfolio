# QA Automation Portfolio
This is my repository for creating a QA automation testing flow using pytest, BDD with behave, and Playwright with TypeScript (*in progress*). I use `restful-booker` from https://restful-booker.herokuapp.com/apidoc/index.html as the system under test.


## python-bdd

I use pytest for running integration tests and BDD with behave for running smoke tests, positive and negative test cases.

### Tech Stack
- Python 3.14
- requests
- pytest
- behave

### Project Structure
- features/ ---> (*Main folder for BDD*)
    - steps/ ---> (*Subfolder for step definitions*)
        - booking_steps.py ---> (*Step definitions*)
    - booking.feature ---> (*behave scenarios*)
    - environment.py ---> (*Hooks for token setup and cleanup*)
- tests/ ---> (*Main folder for pytest*)
    - conftest.py ---> (*pytest fixtures*)
    - test_booking.py ---> (*pytest test cases*)
- utils/ ---> (*Main folder for shared helpers*)
    - api_client.py ---> (*Functions that call the API*)
    - booking_data.py ---> (*Factory functions for booking payloads*)
- pytest.ini ---> (*pytest configuration: pythonpath, testpaths*)
- requirements.txt ---> (*Pinned dependencies*)

### Setup
1. Clone this repository and go to the `python-bdd` folder
    - `git clone https://github.com/azmi72/qa-automation-portfolio.git`
    - `cd qa-automation-portfolio/python-bdd`
2. Create and activate a Python virtual environment
    - `python3.14 -m venv .venv`
    - `source .venv/bin/activate`
3. Install dependencies
    - `pip install -r requirements.txt`

All commands below are run from the `python-bdd` folder with the virtual environment activated.

### How to Run
- `pytest -v` ---> (*Run all integration tests*)
- `behave` ---> (*Run all behave scenarios*)
- `behave -t @smoke` ---> (*Run only smoke scenarios*)
- `behave -t @positive` ---> (*Run only positive scenarios*)
- `behave -t @negative` ---> (*Run only negative scenarios*)
- `behave -D base_url=<url>` ---> (*Run behave against a different base URL*)

### Findings

Tests assert the documented or actual behavior. Differences from REST conventions are recorded in the table below.

| No | Endpoint | Expected | Actual | Notes |
|---|---|---|---|---|
| 1 | `GET /ping` | `200` (or `204`) | `201 Created` | `201` means a new resource was created, which does not fit a health check. |
| 2 | `POST /booking` | `201` (REST convention) | `200`, as documented in `/apidoc` | Tests assert `200` to follow the documentation. The difference from REST conventions is worth discussing with the developers. |
| 3 | `PUT /booking/{id}` with no token or an invalid token | `401` | `403 Forbidden` | The request fails authentication, so `401` is expected. `/apidoc` does not document this case, so tests assert `403`. |
| 4 | `DELETE /booking/{id}` | `200` or `204` | `201`, as documented in `/apidoc` | `201` means a new resource was created, which does not fit a delete. Tests assert `201` to follow the documentation. |
| 5 | Error responses (`403`, `404`) | JSON body, consistent with success responses | Plain text `Forbidden`, `Not Found` | Clients must read error responses with `.text` instead of `.json()`. |
| 6 | `POST /booking` without `firstname` or with an empty body `{}` | `400` | `500 Internal Server Error` | A `5xx` status means the server is at fault, but the cause is client input. This shows that input validation is missing. |

## playwright-ts

In progress.