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


CREATE IF NOT EXISTS TABLE contacts (
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


CREATE TABLE IF NOT EXISTS customers (
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
                                 REFERENCES customers(customer_id)
                                 ON DELETE CASCADE
);