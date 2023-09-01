CREATE TABLE towns (
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    reg_code VARCHAR(255) NOT NULL
);

CREATE TABLE registration_numbers (
    id SERIAL NOT NULL PRIMARY KEY,
    reg_number VARCHAR(255) NOT NULL,
    town_id INT REFERENCES towns(id)
);

INSERT INTO towns (name, reg_code) 
VALUES 
    ('Cape Town', 'CA'), 
    ('Paarl', 'CJ'),
    ('George', 'CAW'),
    ('Stellenbosch', 'CL'),
    ('Bellville', 'CY');