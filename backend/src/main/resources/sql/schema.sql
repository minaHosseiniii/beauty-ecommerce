CREATE TABLE IF NOT EXISTS products
(
    product_id  BIGINT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(250)                          NOT NULL,
    description VARCHAR(500)                          NOT NULL,
    price       DECIMAL(10, 2)                        NOT NULL,
    popularity  INT                                   NOT NULL,
    image_url   VARCHAR(500),
    created_at  TIMESTAMP   DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by  VARCHAR(20)                           NOT NULL,
    updated_at  TIMESTAMP   DEFAULT NULL,
    updated_by  VARCHAR(20) DEFAULT NULL
    );


CREATE TABLE IF NOT EXISTS contacts (
                          contact_id BIGINT AUTO_INCREMENT PRIMARY KEY,
                          name VARCHAR(100),
                          email VARCHAR(100),
                          mobile_number VARCHAR(20),
                          message VARCHAR(500),
                          created_at TIMESTAMP,
                          created_by VARCHAR(100),
                          updated_at TIMESTAMP,
                          updated_by VARCHAR(100)
);


CREATE TABLE IF NOT EXISTS users (
                           customer_id BIGINT PRIMARY KEY AUTO_INCREMENT,

                           name VARCHAR(100) NOT NULL,

                           email VARCHAR(100) NOT NULL,

                           mobile_number VARCHAR(15) NOT NULL,

                           password_hash VARCHAR(255) NOT NULL,

                           created_at TIMESTAMP,

                           created_by VARCHAR(100),

                           updated_at TIMESTAMP,

                           updated_by VARCHAR(100),

                           UNIQUE(email),

                           UNIQUE(mobile_number)
);

CREATE TABLE IF NOT  EXISTS address (

                         address_id BIGINT PRIMARY KEY AUTO_INCREMENT,

                         customer_id BIGINT NOT NULL,

                         street VARCHAR(150) NOT NULL,

                         city VARCHAR(100) NOT NULL,

                         state VARCHAR(100) NOT NULL,

                         postal_code VARCHAR(20) NOT NULL,

                         country VARCHAR(100) NOT NULL,

                         CONSTRAINT fk_address_customer
                             FOREIGN KEY(customer_id)
                                 REFERENCES users(customer_id)
                                 ON DELETE CASCADE
);

create table if not exists roles (role_id bigint not null auto_increment, created_at datetime(6) not null, created_by varchar(255) not null,
    updated_at datetime(6), updated_by varchar(255), role_name varchar(255), primary key (role_id));

create table if not exists customer_role (customer_id bigint not null, role_id bigint not null, primary key (customer_id, role_id));

create table if not exists permissions (permission_id bigint not null auto_increment, created_at datetime(6) not null,
    created_by varchar(255) not null, updated_at datetime(6), updated_by varchar(255), permission_name varchar(255), primary key (permission_id));

CREATE TABLE IF NOT EXISTS role_permission
(
    role_id       BIGINT NOT NULL,
    permission_id BIGINT NOT NULL,

    PRIMARY KEY (role_id, permission_id),

    CONSTRAINT fk_role_permission_role
    FOREIGN KEY (role_id)
    REFERENCES roles(role_id),

    CONSTRAINT fk_role_permission_permission
    FOREIGN KEY (permission_id)
    REFERENCES permissions(permission_id)
    );

CREATE TABLE IF NOT EXISTS orders
(
    id             BIGINT AUTO_INCREMENT PRIMARY KEY,
    customer_id    BIGINT         NOT NULL,
    total_price    DECIMAL(10, 2) NOT NULL,
    payment_id     VARCHAR(255)   NOT NULL,
    payment_status VARCHAR(255)   NOT NULL,

    created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by     VARCHAR(255) NOT NULL,
    updated_at     TIMESTAMP DEFAULT NULL,
    updated_by     VARCHAR(255) DEFAULT NULL,

    CONSTRAINT fk_order_customer
    FOREIGN KEY (customer_id)
    REFERENCES users(customer_id)
    );



CREATE TABLE IF NOT EXISTS order_items
(
    id         BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id   BIGINT         NOT NULL,
    product_id BIGINT         NOT NULL,
    quantity   INT            NOT NULL,
    price      DECIMAL(10, 2) NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by VARCHAR(255) NOT NULL,
    updated_at TIMESTAMP DEFAULT NULL,
    updated_by VARCHAR(255) DEFAULT NULL,

    CONSTRAINT fk_order_item_order
    FOREIGN KEY (order_id)
    REFERENCES orders(id),

    CONSTRAINT fk_order_item_product
    FOREIGN KEY (product_id)
    REFERENCES products(product_id)
    );
