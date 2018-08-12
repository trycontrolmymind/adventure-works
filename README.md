# 1. Choose a technology stack
- API Layer
  - Node.js - Workers language
  - Express.js - Request router
  - body-parser = Json parser middleware
  - Joi - validate incoming requests
  - Winston - logging things
  - BusMQ - queue manager
  - Fetch - request simplify
  - Mocha, Chai - testing
  - Node-postgres - driver for PostgreSQL
- DB Layer - PostgreSQL
- Queue Layer - Redis
- Nginx Proxy - to load balance


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

# 3. Make a worker for reviews
- Validate incoming message;
- Check for a bad words;
- Change status of current review;
- Send review to Notification worker;


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
