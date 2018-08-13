- [Installation](#installation)
- [1. Choose a technology stack](#1-choose-a-technology-stack)
- [2. Make a simple HTTP service](#2-make-a-simple-http-service)
- [3. Make a worker for reviews](#3-make-a-worker-for-reviews)
- [4. Make a worker for review notification](#4-make-a-worker-for-review-notification)
- [My notes](#my-notes)
- [DB changes](#db-changes)
- [Simple API tests](#simple-api-tests)
  - [LoadTest](#loadtest)

# Installation
```bash
git clone https://github.com/trycontrolmymind/adventure-works.git
cd adventure-works
docker-compose up --build
```
What's outside of container:
- http://0.0.0.0:8888 - API
- http://0.0.0.0:8080 - PostgreSQL mini admin panel
- http://0.0.0.0:6379 - Redis

# 1. Choose a technology stack
- API Layer
  - Node.js - Workers language
  - Express.js - Request router
  - body-parser - Json parser middleware
  - Joi - validate incoming requests
  - Winston - logging things
  - BusMQ - queue manager
  - Fetch - request simplify
  - Mocha, Chai - testing
  - Node-postgres - driver for PostgreSQL
- DB Layer - PostgreSQL
- Queue Layer - Redis

# 2. Make a simple HTTP service
•	API Layer (HTTP):

-	Client submits a product review via HTTP:

```bash
curl -X POST http://0.0.0.0:8888/api/reviews \
 	-H 'Content-Type: application/json' \
  -d '{
      "name": "Elvis Presley",
      "email": "theking@elvismansion.com",
      "productid": "8",
      "review": "I really love the product and will recommend!"
  }'
```
-	API HTTP response:
```
{
	"success": true,
	"reviewID": [id integer]
}
```
The API puts the product review into the database and onto a queue for processing.
- Create some simple tests;
- Write review to DB;

# 3. Make a worker for reviews
- Validate incoming message;
- Check for a bad words;
- Change status of current review;
- Send review to Notification worker;

# 4. Make a worker for review notification
- Validate incoming message;
- Emulate notification;

# My notes
- Better to create a simple .sql or .sql.gz file for DB example, like in my repository;
- No concrete description of how review will change status.
- Strange description about when reviewer should be 'notified'
```
post the review live once approved or archive if not approved and notify the reviewer via email (simulated) once the review status has been finalized.
```
and other one is...
```
Once the review is approved and published, the reviewer is notified via email.
```

# DB changes
- Update PK counter of product.review
- Create product.reviewstatus table
- Update product.review, adding reviewstatusid from product.reviewstatus

# Simple API tests
```bash
npm run test
```

```
API Node.js
  ✓ should return 404 if unexisted path
  ✓ should not have X-Powered-By header
  ✓ should return 400 if json is invalid
  ✓ should return 200 if ok body
  ✓ should return success false if productid not exists


5 passing (74ms)
```

## LoadTest
```
Mac middle 15
CPU: 6 (2,2 GHz Intel Core i7)
Memory: 6 GB
```
```json
{
  "totalRequests": 10000,
  "totalErrors": 0,
  "totalTimeSeconds": 103.874700704,
  "rps": 96,
  "meanLatencyMs": 10.3,
  "maxLatencyMs": 749,
  "minLatencyMs": 5,
  "percentiles": {
    "50": 9,
    "90": 13,
    "95": 16,
    "99": 24
  },
  "errorCodes": {}
}
```

LoadTest using remote machine:
- CPU: 1vCPU 2Ghz
- Memory: 1GB

```json
{
  "totalRequests": 1808,
  "totalErrors": 0,
  "totalTimeSeconds": 148.748090427,
  "rps": 12,
  "meanLatencyMs": 82.2,
  "maxLatencyMs": 1087,
  "minLatencyMs": 73,
  "percentiles": {
    "50": 78,
    "90": 87,
    "95": 90,
    "99": 123
  },
  "errorCodes": {}
}
```
