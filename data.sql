-- Create tables
CREATE TABLE users (
    email VARCHAR(255) PRIMARY KEY,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL,
    profile_pic TEXT
);

CREATE TABLE ville (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    longitude DOUBLE PRECISION,
    latitude DOUBLE PRECISION,
    altitude DOUBLE PRECISION
);

CREATE TABLE cinema (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    longitude DOUBLE PRECISION,
    latitude DOUBLE PRECISION,
    altitude DOUBLE PRECISION,
    nombre_salles INTEGER NOT NULL,
    ville_id BIGINT REFERENCES ville(id),
    owner_email VARCHAR(255) REFERENCES users(email),
    curr_status VARCHAR(50)
);

CREATE TABLE categorie (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE film (
    id BIGSERIAL PRIMARY KEY,
    titre VARCHAR(255) NOT NULL,
    duree DOUBLE PRECISION,
    realisateur VARCHAR(255),
    description TEXT,
    photo VARCHAR(255),
    date_sortie DATE,
    categorie_id BIGINT REFERENCES categorie(id)
);

CREATE TABLE salle (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    nombre_places INTEGER NOT NULL,
    cinema_id BIGINT REFERENCES cinema(id)
);

CREATE TABLE place (
    id BIGSERIAL PRIMARY KEY,
    numero INTEGER NOT NULL,
    row_number INTEGER NOT NULL,
    column_number INTEGER NOT NULL,
    salle_id BIGINT REFERENCES salle(id)
);

CREATE TABLE seance (
    id BIGSERIAL PRIMARY KEY,
    heure_debut TIMESTAMP NOT NULL
);

CREATE TABLE projection_film (
    id BIGSERIAL PRIMARY KEY,
    date_projection DATE NOT NULL,
    prix DOUBLE PRECISION NOT NULL,
    film_id BIGINT REFERENCES film(id),
    salle_id BIGINT REFERENCES salle(id),
    seance_id BIGINT REFERENCES seance(id)
);

CREATE TABLE ticket (
    id BIGSERIAL PRIMARY KEY,
    nom_client VARCHAR(255) NOT NULL,
    prix DOUBLE PRECISION NOT NULL,
    code_payement INTEGER NOT NULL,
    reservee BOOLEAN DEFAULT false,
    user_email VARCHAR(255) REFERENCES users(email),
    place_id BIGINT REFERENCES place(id),
    projection_film_id BIGINT REFERENCES projection_film(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(projection_film_id, place_id)
);

CREATE TABLE payment (
    id BIGSERIAL PRIMARY KEY,
    amount DOUBLE PRECISION NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    transaction_id VARCHAR(255) UNIQUE,
    user_email VARCHAR(255) REFERENCES users(email),
    ticket_id BIGINT REFERENCES ticket(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
-- Users
INSERT INTO users (email, password_hash, name, role) VALUES 
('admin@cinema.ca', 'admin', 'Cinema Admin', 'ADMIN'),
('owner.toronto@cinema.ca', 'owner', 'Toronto Cinema Owner', 'CINEMA_OWNER'),
('owner.vancouver@cinema.ca', 'owner', 'Vancouver Cinema Owner', 'CINEMA_OWNER'),
('owner.montreal@cinema.ca', 'owner', 'Montreal Cinema Owner', 'CINEMA_OWNER'),
('user1@example.ca', 'user1', 'Sarah Connor', 'USER'),
('user2@example.ca', 'user2', 'John Smith', 'USER');

-- Cities
INSERT INTO ville (id, name, longitude, latitude, altitude) VALUES 
(1, 'Toronto', -79.3832, 43.6532, 76),
(2, 'Vancouver', -123.1207, 49.2827, 0),
(3, 'Montreal', -73.5673, 45.5017, 233);

-- Cinemas
INSERT INTO cinema (id, name, owner_email, longitude, latitude, altitude, nombre_salles, ville_id, curr_status) VALUES 
(1, 'Scotiabank Theatre', 'owner.toronto@cinema.ca', -79.3832, 43.6532, 76, 3, 1, 'VERIFIED'),
(2, 'Cineplex Downtown', 'owner.vancouver@cinema.ca', -123.1207, 49.2827, 0, 2, 2, 'VERIFIED'),
(3, 'Cinema Banque Scotia', 'owner.montreal@cinema.ca', -73.5673, 45.5017, 233, 3, 3, 'VERIFIED');

-- Categories
INSERT INTO categorie (id, name) VALUES 
(1, 'Action'),
(2, 'Comedy'),
(3, 'Drama'),
(4, 'Sci-Fi');

-- Films
INSERT INTO film (id, titre, duree, realisateur, description, date_sortie, categorie_id) VALUES 
(1, 'Inception', 148, 'Christopher Nolan', 'A thief who steals corporate secrets', '2010-07-16', 4),
(2, 'The Batman', 176, 'Matt Reeves', 'Batman ventures into Gotham''s underworld', '2022-03-04', 1),
(3, 'Barbie', 114, 'Greta Gerwig', 'Barbie and Ken''s adventures', '2023-07-21', 2),
(4, 'Oppenheimer', 180, 'Christopher Nolan', 'Story of J. Robert Oppenheimer', '2023-07-21', 3);

-- Salles
INSERT INTO salle (id, name, nombre_places, cinema_id) VALUES 
(1, 'IMAX 1', 200, 1),
(2, 'VIP 1', 100, 1),
(3, 'Standard 1', 150, 1),
(4, 'ULTRA AVX', 180, 2),
(5, 'Standard 1', 140, 2),
(6, 'Salle Premium', 160, 3),
(7, 'Salle VIP', 80, 3),
(8, 'Salle Standard', 120, 3);

-- Modify room sizes to be more manageable
UPDATE salle SET nombre_places = 20 WHERE id = 1; -- IMAX 1 (4 rows x 5 columns)
UPDATE salle SET nombre_places = 12 WHERE id = 2; -- VIP 1 (3 rows x 4 columns)
UPDATE salle SET nombre_places = 15 WHERE id = 3; -- Standard 1 (3 rows x 5 columns)
UPDATE salle SET nombre_places = 16 WHERE id = 4; -- ULTRA AVX (4 rows x 4 columns)
UPDATE salle SET nombre_places = 12 WHERE id = 5; -- Standard 1 (3 rows x 4 columns)
UPDATE salle SET nombre_places = 15 WHERE id = 6; -- Salle Premium (3 rows x 5 columns)
UPDATE salle SET nombre_places = 12 WHERE id = 7; -- Salle VIP (3 rows x 4 columns)
UPDATE salle SET nombre_places = 15 WHERE id = 8; -- Salle Standard (3 rows x 5 columns)

-- Places for IMAX 1 (id: 1) - 4 rows x 5 columns
INSERT INTO place (numero, row_number, column_number, salle_id) 
SELECT 
    ROW_NUMBER() OVER () as numero,
    ((n-1) / 5) + 1 as row_number,
    ((n-1) % 5) + 1 as column_number,
    1 as salle_id
FROM generate_series(1, 20) n;

-- Places for VIP 1 (id: 2) - 3 rows x 4 columns
INSERT INTO place (numero, row_number, column_number, salle_id) 
SELECT 
    ROW_NUMBER() OVER () + 20 as numero,
    ((n-1) / 4) + 1 as row_number,
    ((n-1) % 4) + 1 as column_number,
    2 as salle_id
FROM generate_series(1, 12) n;

-- Places for Standard 1 (id: 3) - 3 rows x 5 columns
INSERT INTO place (numero, row_number, column_number, salle_id) 
SELECT 
    ROW_NUMBER() OVER () + 32 as numero,
    ((n-1) / 5) + 1 as row_number,
    ((n-1) % 5) + 1 as column_number,
    3 as salle_id
FROM generate_series(1, 15) n;

-- Places for ULTRA AVX (id: 4) - 4 rows x 4 columns
INSERT INTO place (numero, row_number, column_number, salle_id) 
SELECT 
    ROW_NUMBER() OVER () + 47 as numero,
    ((n-1) / 4) + 1 as row_number,
    ((n-1) % 4) + 1 as column_number,
    4 as salle_id
FROM generate_series(1, 16) n;

-- Places for Standard 1 Vancouver (id: 5) - 3 rows x 4 columns
INSERT INTO place (numero, row_number, column_number, salle_id) 
SELECT 
    ROW_NUMBER() OVER () + 63 as numero,
    ((n-1) / 4) + 1 as row_number,
    ((n-1) % 4) + 1 as column_number,
    5 as salle_id
FROM generate_series(1, 12) n;

-- Places for Salle Premium Montreal (id: 6) - 3 rows x 5 columns
INSERT INTO place (numero, row_number, column_number, salle_id) 
SELECT 
    ROW_NUMBER() OVER () + 75 as numero,
    ((n-1) / 5) + 1 as row_number,
    ((n-1) % 5) + 1 as column_number,
    6 as salle_id
FROM generate_series(1, 15) n;

-- Places for Salle VIP Montreal (id: 7) - 3 rows x 4 columns
INSERT INTO place (numero, row_number, column_number, salle_id) 
SELECT 
    ROW_NUMBER() OVER () + 90 as numero,
    ((n-1) / 4) + 1 as row_number,
    ((n-1) % 4) + 1 as column_number,
    7 as salle_id
FROM generate_series(1, 12) n;

-- Places for Salle Standard Montreal (id: 8) - 3 rows x 5 columns
INSERT INTO place (numero, row_number, column_number, salle_id) 
SELECT 
    ROW_NUMBER() OVER () + 102 as numero,
    ((n-1) / 5) + 1 as row_number,
    ((n-1) % 5) + 1 as column_number,
    8 as salle_id
FROM generate_series(1, 15) n;

-- Seances
INSERT INTO seance (id, heure_debut) VALUES 
(1, '2024-01-20 14:00:00'),
(2, '2024-01-20 17:00:00'),
(3, '2024-01-20 20:00:00'),
(4, '2024-01-20 22:30:00');

-- ProjectionFilm
INSERT INTO projection_film (id, date_projection, prix, film_id, salle_id, seance_id) VALUES 
(1, '2024-01-20', 15.99, 1, 1, 1),
(2, '2024-01-20', 18.99, 2, 2, 2),
(3, '2024-01-20', 12.99, 3, 3, 3),
(4, '2024-01-20', 19.99, 4, 1, 4);


-- Tickets
INSERT INTO ticket (id, nom_client, prix, code_payement, reservee, user_email, place_id, projection_film_id, created_at) VALUES 
(1, 'Sarah Connor', 15.99, 12345, true, 'user1@example.ca', 1, 1, '2024-01-20 13:45:00'),
(2, 'John Smith', 18.99, 12346, true, 'user2@example.ca', 2, 2, '2024-01-20 16:30:00');
INSERT INTO ticket (id, nom_client, prix, code_payement, reservee, user_email, place_id, projection_film_id, created_at) VALUES 
(3, 'Sarah Connor', 12.99, 12347, true, 'user1@example.ca', 3, 3, '2024-01-20 19:15:00'),
(4, 'John Smith', 19.99, 12348, true, 'user2@example.ca', 4, 4, '2024-01-20 22:00:00');

-- Payments
INSERT INTO payment (id, amount, status, transaction_id, user_email, ticket_id, created_at, updated_at) VALUES
(1, 15.99, 'COMPLETED', 'TXN_12345', 'user1@example.ca', 1, '2024-01-20 13:45:00', '2024-01-20 13:46:00'),
(2, 18.99, 'COMPLETED', 'TXN_12346', 'user2@example.ca', 2, '2024-01-20 16:30:00', '2024-01-20 16:31:00'),
(3, 12.99, 'COMPLETED', 'TXN_12347', 'user1@example.ca', 3, '2024-01-20 19:15:00', '2024-01-20 19:16:00'),
(4, 19.99, 'COMPLETED', 'TXN_12348', 'user2@example.ca', 4, '2024-01-20 22:00:00', '2024-01-20 22:01:00');
-- Reset sequences
SELECT setval('ville_id_seq', (SELECT MAX(id) FROM ville));
SELECT setval('cinema_id_seq', (SELECT MAX(id) FROM cinema));
SELECT setval('categorie_id_seq', (SELECT MAX(id) FROM categorie));
SELECT setval('film_id_seq', (SELECT MAX(id) FROM film));
SELECT setval('salle_id_seq', (SELECT MAX(id) FROM salle));
SELECT setval('place_id_seq', (SELECT MAX(id) FROM place));
SELECT setval('seance_id_seq', (SELECT MAX(id) FROM seance));
SELECT setval('projection_film_id_seq', (SELECT MAX(id) FROM projection_film));
SELECT setval('payment_id_seq', (SELECT MAX(id) FROM payment));
SELECT setval('ticket_id_seq', (SELECT MAX(id) FROM ticket));
