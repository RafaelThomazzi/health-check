# service-health-check
# Backend of a service that checks the availability of another service and sends SMS to registered numbers notifying when a service responds differently than expected or is unavailable.

# Technologies:
NodeJs + Typescript, Express, SQLITE, Amazon SNS.

# Operation:
1. Register the requests you want to test.

2. Call the Take-Snapshot endpoint, this endpoint will call all the registered endpoints and save your answer and its average execution time, after that, the system will automatically call the registered endpoints every 1 minute. If any of them has a response different from the response expected by Take-Snapshot, the service will send an SMS to the registered addresses describing which service is unavailable or responding incorrectly.

3. Check the Status of the service via the /scan, /health-check and /status endpoints.

# Environment Variables
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=

# Endpoints:
Creation of request that will be tested.
POST
/requests
body: {
    name, url, method, body
}

Search list of registered requisitions.
GET
/requests

Delete request:
DELETE
/requests/{{id}}

Take Snapshot:
POST
/take-snapshot

See details of operation of each registered request
GET
/health-check

See summary of operation of each registered request
GET
/scan

View overall system status
GET
/status

# Install dependencies:
yarn install

# Development run:
yarn start