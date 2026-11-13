# QA Automation Portfolio

[![Tests](https://github.com/azmi72/qa-automation-portfolio/actions/workflows/tests.yml/badge.svg)](https://github.com/azmi72/qa-automation-portfolio/actions/workflows/tests.yml)

This is my repository for creating a QA automation testing flow using **pytest**, **BDD with behave**, and **Playwright with TypeScript**. I use `restful-booker` from https://restful-booker.herokuapp.com/apidoc/index.html as the **system under test**.

**📑 Contents**

- [🐍 python-bdd](#-python-bdd)
- [🎭 playwright-ts](#-playwright-ts)
- [🔁 python-bdd vs playwright-ts](#-python-bdd-vs-playwright-ts)
- [🤖 CI](#-ci)
- [🔍 Findings](#-findings)

---

## 🐍 python-bdd

I use **pytest** for running integration tests and BDD with **behave** for running smoke tests, positive and negative test cases.

### 🧰 Tech Stack

- Python 3.14
- requests
- pytest
- behave

### 📁 Project Structure

| Path | Description |
| --- | --- |
| **`features/`** | **Main folder for BDD** |
| `features/steps/` | Subfolder for step definitions |
| `features/steps/booking_steps.py` | Step definitions |
| `features/booking.feature` | behave scenarios |
| `features/environment.py` | Hooks for token setup and cleanup |
| **`tests/`** | **Main folder for pytest** |
| `tests/conftest.py` | pytest fixtures |
| `tests/test_booking.py` | pytest test cases |
| **`utils/`** | **Main folder for shared helpers** |
| `utils/api_client.py` | Functions that call the API |
| `utils/booking_data.py` | Factory functions for booking payloads |
| `pytest.ini` | pytest configuration: pythonpath, testpaths |
| `requirements.txt` | Pinned dependencies |

### 🚀 Setup

1. **Clone this repository and go to the `python-bdd` folder**
   ```bash
   git clone https://github.com/azmi72/qa-automation-portfolio.git
   cd qa-automation-portfolio/python-bdd
   ```
2. **Create and activate a Python virtual environment**
   ```bash
   python3.14 -m venv .venv
   source .venv/bin/activate
   ```
3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

> 💡 All commands below are run from the `python-bdd` folder with the virtual environment activated.

### 🧪 How to Run

| Command | Description |
| --- | --- |
| `pytest -v` | Run all integration tests |
| `behave` | Run all behave scenarios |
| `behave -t @smoke` | Run only smoke scenarios |
| `behave -t @positive` | Run only positive scenarios |
| `behave -t @negative` | Run only negative scenarios |
| `behave -D base_url=<url>` | Run behave against a different base URL |

---

## 🎭 playwright-ts

I use **Playwright Test** with **TypeScript** for API tests, covering smoke, positive, and negative cases. `npm run typecheck` **catches type errors** in payloads, responses, and function parameters that the test run itself would miss.

### 🧰 Tech Stack

- Node.js 26 LTS
- TypeScript 7
- Playwright Test 1.64 (`@playwright/test`)

### 📁 Project Structure

| Path | Description |
| --- | --- |
| **`src/`** | **Main folder for the framework code** |
| `src/auth.ts` | Helper that builds the auth header |
| `src/booking-client.ts` | Class and methods that call the API |
| `src/booking-data.ts` | Factory functions for booking payloads |
| `src/booking.types.ts` | Types for booking payloads, responses, and credentials |
| `src/config.ts` | Base URL and credentials |
| `src/fixtures.ts` | Custom fixtures for the client, token, payload, and booking setup and cleanup |
| **`tests/`** | **Main folder for Playwright tests** |
| `tests/booking.spec.ts` | Playwright test cases |
| `playwright.config.ts` | Playwright configuration: testDir, reporters, baseURL, forbidOnly, retries |
| `package.json` | Dependencies and npm scripts |
| `package-lock.json` | Locked dependency versions |
| `tsconfig.json` | TypeScript compiler settings |

### 🚀 Setup

1. **Clone this repository and go to the `playwright-ts` folder**
   ```bash
   git clone https://github.com/azmi72/qa-automation-portfolio.git
   cd qa-automation-portfolio/playwright-ts
   ```
2. **Install dependencies**
   ```bash
   npm ci
   ```

> 💡 All commands below are run from the `playwright-ts` folder.

### 🧪 How to Run

> 📌 All commands are defined in the `scripts` field of `package.json`.

| Command | Description |
| --- | --- |
| `npm run typecheck` | Check types in all TypeScript files |
| `npm test` | Run all tests |
| `npm run test:smoke` | Run only smoke tests |
| `npm run test:positive` | Run only positive tests |
| `npm run test:negative` | Run only negative tests |
| `BASE_URL=<url> npm test` | Run the tests against a different base URL |
| `npm run report` | Open the latest HTML report in the browser |

---

## 🔁 python-bdd vs playwright-ts

| Concept | python-bdd | playwright-ts |
| --- | --- | --- |
| **Runner config** | `pytest.ini` | `playwright.config.ts` |
| **Dependencies** | `requirements.txt` | `package.json` + `package-lock.json` |
| **Install** | `pip install -r requirements.txt` | `npm ci` |
| **API calls** | Functions in `utils/api_client.py` | `BookingClient` class in `src/booking-client.ts` |
| **Test data** | `build_booking_payload()` in `utils/booking_data.py` | `buildBookingPayload(overrides)` in `src/booking-data.ts` |
| **Fixtures** | `@pytest.fixture` in `tests/conftest.py`, hooks in `features/environment.py` | `test.extend` in `src/fixtures.ts` |
| **Setup and cleanup boundary** | `yield` | `await use(...)` |
| **Shared token** | `@pytest.fixture(scope="session")` | `{ scope: 'worker' }` |
| **Data-driven tests** | `Scenario Outline` + `Examples` | `for` loop over an array of cases |
| **Tags** | `@smoke` above a scenario | `{ tag: ['@smoke', '@positive'] }` |
| **Run smoke tests** | `behave -t @smoke` | `npm run test:smoke` |
| **Different base URL** | `behave -D base_url=<url>` | `BASE_URL=<url> npm test` |
| **Assertion** | `assert response.status_code == 200` | `expect(response.status()).toBe(200)` |

---

## 🤖 CI

Every push and pull request runs the `Tests` workflow on GitHub Actions ([`.github/workflows/tests.yml`](.github/workflows/tests.yml)). It has **two jobs that run in parallel**:

| Job | Description |
| --- | --- |
| `python-bdd` | Installs the dependencies, then runs `pytest -v` and `behave` |
| `playwright-ts` | Installs the dependencies with `npm ci`, then runs `npm run typecheck` and `npm test` |

The Playwright HTML report is uploaded as the `playwright-report` artifact **on every run, including failed runs**. You can download it from the run summary page in the [Actions tab](https://github.com/azmi72/qa-automation-portfolio/actions). In CI, **`test.only` is not allowed** and **failed tests are retried once**.

---

## 🔍 Findings

**Both suites** assert the documented or actual behavior. Differences from REST conventions are recorded in the table below.

| No | Endpoint | Expected | Actual | Notes |
| --- | --- | --- | --- | --- |
| 1 | `GET /ping` | `200` (or `204`) | `201 Created` | `201` means a new resource was created, which does not fit a health check. |
| 2 | `POST /booking` | `201` (REST convention) | `200`, as documented in `/apidoc` | Tests assert `200` to follow the documentation. The difference from REST conventions is worth discussing with the developers. |
| 3 | `PUT /booking/{id}` with no token or an invalid token | `401` | `403 Forbidden` | The request fails authentication, so `401` is expected. `/apidoc` does not document this case, so tests assert `403`. |
| 4 | `DELETE /booking/{id}` | `200` or `204` | `201`, as documented in `/apidoc` | `201` means a new resource was created, which does not fit a delete. Tests assert `201` to follow the documentation. |
| 5 | Error responses (`403`, `404`) | JSON body, consistent with success responses | Plain text `Forbidden`, `Not Found` | Clients must read error responses with `.text` in Python or `.text()` in Playwright instead of `.json()`. |
| 6 | `POST /booking` without `firstname` or with an empty body `{}` | `400` | `500 Internal Server Error` | A `5xx` status means the server is at fault, but the cause is client input. This shows that input validation is missing. |
