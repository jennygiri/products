# Alfredo Products

An API service for an e-commerce site holding millions of product records and images.
---

### Tech Stack

![node](https://www.vectorlogo.zone/logos/nodejs/nodejs-ar21.svg)

- Node.js provides an asynchronous event-driven runtime environment for building scalable network applications

![express](https://www.vectorlogo.zone/logos/expressjs/expressjs-ar21.svg)

- Express was chosen for it's minimal interface and flexible HTTP routing methods

![postgres](https://www.vectorlogo.zone/logos/postgresql/postgresql-ar21.svg)

- PostreSQL is used here as a robust and stable open source database, chosen for its relational features

![nginx](https://www.vectorlogo.zone/logos/nginx/nginx-ar21.svg)

- NGINX enables horizontally scaling, load balancing HTTP traffic between between various routers

---

### System Architecture

Phase 1 - Singular EC2 micro-instance

![](https://i.imgur.com/RufOYUJ.png)

Phase 2 - Multiple EC2 instances, balanced by NGINX.  This horizontal scaling allowed for at least 3000 rps over a 30-60 second period of time.

![](https://i.imgur.com/JKqO92A.png)
