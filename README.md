# 1. Choose a technology stack
- API Layer
  - Node.js - Workers language
  - Express.js - Request router
  - Joi - validate incoming requests
  - Winston - logging things
  - BusMQ - queue manager
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
