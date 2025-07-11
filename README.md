#  Email Sending Service

A resilient, production-ready email sending microservice built with Node.js and Express. This service supports fault tolerance, rate limiting, retry with exponential backoff, fallback providers, idempotency, and status tracking.

---

##  Features

-  Retry mechanism with exponential backoff
-  Fallback between two mock email providers
- Idempotency to prevent duplicate sends
-  Rate limiting to control API abuse
-  Status tracking for email attempts
-  Extensible architecture
-  Deployed on Vercel

---

##  Tech Stack

- **Backend:** Node.js, Express
- **Rate Limiting:** express-rate-limit
- **Deployment:** Vercel
- **Language:** JavaScript (ES6+)

---

##  Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/codegurupoocoo/email-sending-service.git
cd email-sending-service
