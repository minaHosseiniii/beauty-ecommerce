# Beauty Ecommerce

A full-stack e-commerce application for a beauty and cosmetics store, built with **Spring Boot, React, and MySQL**.

The project provides core online shopping functionality, including product browsing, customer authentication, profile and address management, order processing, and Stripe payment integration. It also includes a role and permission data model, JWT-based authentication, Docker-based deployment, and a GitHub Actions CI/CD workflow.

---

## Key Features

### Customer & Authentication
- Customer registration and login.
- JWT-based authentication and request authorization.
- Secure password hashing using Spring Security.
- Customer profile management.
- Multiple customer addresses with ownership validation.
- Password compromise checking through Have I Been Pwned integration.

### Product Management
- Retrieve individual product details.
- Browse the product catalog.
- Product information includes name, description, price, popularity, and image URL.

### Shopping & Order Processing
- Create customer orders containing multiple order items.
- Associate orders with authenticated customers.
- Validate that the selected shipping address belongs to the authenticated customer.
- Store shipping address information as part of the order.
- Track order statuses, including `CREATED`, `CONFIRMED`, and `CANCELLED`.
- Retrieve customer orders in descending creation-date order.

### Payment Integration
- Stripe PaymentIntent creation using the Stripe Java SDK.
- Return the PaymentIntent client secret to the frontend.
- Stripe React integration for the payment interface.

### Administration
- Admin dashboard endpoint.
- Retrieve orders awaiting processing.
- Confirm or cancel orders through dedicated endpoints.

### Contact
- Customer contact form submission.
- Persist contact messages in the database.

---

## Technology Stack

### Backend

| Technology | Purpose |
|---|---|
| Java 17 | Programming language |
| Spring Boot 3.5.7 | Application framework |
| Spring MVC | REST API development |
| Spring Data JPA | Data access and persistence |
| Hibernate | ORM |
| Spring Security | Authentication and security |
| JWT (JJWT) | Token-based authentication |
| MySQL 8 | Relational database |
| MapStruct | DTO and entity mapping |
| Lombok | Boilerplate reduction |
| Jakarta Validation | Request validation |
| Stripe Java SDK | Payment integration |
| Springdoc OpenAPI | API documentation |
| Maven | Dependency and build management |

### Frontend

| Technology | Purpose |
|---|---|
| React 19 | UI development |
| Vite 8 | Development and build tooling |
| React Router 7 | Client-side routing |
| Tailwind CSS 4 | Styling |
| Axios | HTTP communication |
| Stripe.js & React Stripe.js | Payment UI integration |
| Font Awesome & React Icons | Icon libraries |
| js-cookie | Cookie management |
| ESLint | Code quality and linting |

### DevOps & Infrastructure

- Docker and Docker Compose
- GitHub Actions
- GitHub Container Registry (GHCR)
- Jib Maven Plugin
- MySQL Docker image

---

## Architecture

The application follows a layered backend architecture, separating HTTP request handling, business logic, persistence, and data transformation.

```text
Frontend (React)
       |
       | HTTP / REST API
       v
Spring Boot Backend
       |
       +-- Controllers
       |
       +-- Services
       |
       +-- Repositories
       |
       +-- DTOs & MapStruct Mappers
       |
       +-- Entities
       |
       v
     MySQL
       |
       +-- Customers
       +-- Products
       +-- Orders
       +-- Order Items
       +-- Addresses
       +-- Roles & Permissions
       +-- Contacts

External Integration:
       |
       +-- Stripe
       +-- Have I Been Pwned
```

### Backend Design

The backend is organized into dedicated packages:

- **Controller:** REST API endpoints and HTTP request handling.
- **Service:** Business logic and application operations.
- **Repository:** Database access through Spring Data JPA.
- **Entity:** Persistent domain models.
- **DTO:** Request and response data structures.
- **Mapper:** Entity-to-DTO and DTO-to-entity transformations.
- **Configuration:** Security, JWT, Stripe, auditing, and exception handling.

The application uses a global exception handler and dedicated validation and error response DTOs.

---

## Security

Security is implemented using Spring Security and JWT-based authentication.

Key implementation details:

- Stateless authentication using JWT bearer tokens.
- Custom authentication provider.
- JWT validation through a request filter.
- Password hashing with Spring Security's password encoder.
- Compromised password checking through Have I Been Pwned.
- Public and authenticated API route configuration.
- Customer ownership validation when accessing shipping addresses during order creation.
- CORS configuration.

The data model also includes `Role` and `Permission` entities, with many-to-many relationships between customers, roles, and permissions.

---

## Database Design

The application uses MySQL with Spring Data JPA and Hibernate.

### Main Entities

| Entity | Responsibility |
|---|---|
| Customer | Customer accounts and authentication information |
| Product | Store product information |
| Order | Customer orders, totals, status, and shipping information |
| OrderItem | Products and quantities belonging to an order |
| Address | Customer shipping addresses |
| Role | Customer roles |
| Permission | Permission definitions |
| Contact | Customer contact messages |

### Entity Relationships

- A customer can have multiple addresses.
- A customer can place multiple orders.
- An order contains multiple order items.
- Each order item references a product.
- Customers and roles have a many-to-many relationship.
- Roles and permissions have a many-to-many relationship.

### Additional Design Details

- `BaseEntity` is a mapped superclass providing creation and update timestamps and auditor fields for applicable entities.
- `ShippingAddress` is an embeddable value object stored within the `Order` table rather than a separate entity.
- Customer-address relationships use cascading and orphan removal.
- SQL initialization scripts are used for schema and initial data setup.

---

## API Overview

The backend exposes REST endpoints under the `/api/v1` prefix.

| Resource | Endpoint | Description |
|---|---|---|
| Authentication | `/api/v1/auth/**` | Registration and authentication |
| Products | `/api/v1/products/**` | Product catalog and product details |
| Addresses | `/api/v1/addresses/**` | Customer address operations |
| Profile | `/api/v1/profile/**` | Customer profile operations |
| Orders | `/api/v1/orders/**` | Order operations |
| Payments | `/api/v1/payments/create-intent` | Create a Stripe PaymentIntent |
| Admin | `/api/v1/admin/dashboard` | Admin dashboard |
| Admin | `/api/v1/admin/orders` | Retrieve created orders |
| Admin | `/api/v1/admin/orders/{id}/confirm` | Confirm an order |
| Admin | `/api/v1/admin/orders/{id}/cancel` | Cancel an order |
| Contacts | `/api/v1/contacts/**` | Contact form operations |

### API Documentation

The project includes Springdoc OpenAPI for API documentation.

When the application is running, the Swagger UI is available at:

```text
http://localhost:8080/swagger-ui/index.html
```

OpenAPI specification:

```text
http://localhost:8080/v3/api-docs
```

---

## Running the Project

### Prerequisites

- Java 17
- Maven
- Node.js and npm
- MySQL 8.0

### 1. Clone the Repository

```bash
git clone https://github.com/minaHosseiniii/beauty-ecommerce.git

cd beauty-ecommerce
```

### 2. Configure the Backend

The backend uses Spring profiles and environment-based configuration.

The default local configuration expects MySQL to be available at:

```text
jdbc:mysql://localhost:3306/BeautyStoreDB
```

Configure the database credentials and Stripe test secret key before starting the application.

The Stripe secret key is read from:

```text
LOCAL_STRIPE_SECRET_KEY
```

### 3. Start the Backend

```bash
cd backend

mvn spring-boot:run
```

The backend runs on:

```text
http://localhost:8080
```

### 4. Start the Frontend

From the frontend project directory:

```bash
npm install
npm run dev
```

Vite starts the frontend development server and displays its local URL in the terminal.

### 5. Build the Frontend

```bash
npm run build
```

Run ESLint:

```bash
npm run lint
```

---

## Docker Deployment

The project includes a Docker Compose configuration for running the backend and MySQL database.

### Services

| Service | Image | Port |
|---|---|---|
| MySQL | `mysql:8.0` | `3306` |
| Backend | `ghcr.io/minahosseiniii/beauty-ecommerce:latest` | `8080` |

### Start the Services

From the directory containing `docker-compose.yml`:

```bash
docker compose up -d
```

Check service status:

```bash
docker compose ps
```

View backend logs:

```bash
docker compose logs -f backend
```

Stop the services:

```bash
docker compose down
```

The MySQL data is persisted through a named Docker volume:

```text
mysql_data
```

The backend waits for the MySQL health check to pass before starting.

**Note:** The current Docker Compose configuration starts the backend and database services. The frontend is started separately.

---

## CI/CD Pipeline

GitHub Actions automates backend testing and Docker image publishing.

The workflow performs the following steps:

1. Checks out the repository.
2. Sets up Java 17 using Eclipse Temurin.
3. Starts a MySQL 8 service container with a health check.
4. Runs backend tests using Maven with the `test` Spring profile.
5. Authenticates with GitHub Container Registry.
6. Builds and publishes the backend Docker image using Jib
