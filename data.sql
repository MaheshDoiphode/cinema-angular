-- Drop tables if they exist (in reverse order of dependencies)
DROP TABLE IF EXISTS ticket CASCADE;
DROP TABLE IF EXISTS payment CASCADE;
DROP TABLE IF EXISTS projection_film CASCADE;
DROP TABLE IF EXISTS seance CASCADE;
DROP TABLE IF EXISTS place CASCADE;
DROP TABLE IF EXISTS salle CASCADE;
DROP TABLE IF EXISTS film CASCADE;
DROP TABLE IF EXISTS categorie CASCADE;
DROP TABLE IF EXISTS cinema CASCADE;
DROP TABLE IF EXISTS ville CASCADE;
DROP TABLE IF EXISTS users CASCADE;

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
CREATE TABLE payment (
    id BIGSERIAL PRIMARY KEY,
    amount DOUBLE PRECISION NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    transaction_id VARCHAR(255) UNIQUE,
    user_email VARCHAR(255) REFERENCES users(email),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
    payment_id BIGINT REFERENCES payment(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(projection_film_id, place_id)
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

-- Cities (Expanded)
INSERT INTO ville (id, name, longitude, latitude, altitude) VALUES 
(1, 'Toronto', -79.3832, 43.6532, 76),
(2, 'Vancouver', -123.1207, 49.2827, 0),
(3, 'Montreal', -73.5673, 45.5017, 233),
(4, 'Calgary', -114.0719, 51.0447, 1045),
(5, 'Ottawa', -75.6972, 45.4215, 70),
(6, 'Edmonton', -113.4938, 53.5461, 645);

-- Cinemas (Multiple per city, shared owners)
INSERT INTO cinema (id, name, owner_email, longitude, latitude, altitude, nombre_salles, ville_id, curr_status) VALUES 
-- Toronto Cinemas
(1, 'Scotiabank Theatre', 'owner.toronto@cinema.ca', -79.3832, 43.6532, 76, 3, 1, 'VERIFIED'),
(2, 'Royal Cinema', 'owner.toronto@cinema.ca', -79.4012, 43.6555, 76, 3, 1, 'VERIFIED'),
(3, 'TIFF Bell Lightbox', 'owner.montreal@cinema.ca', -79.3907, 43.6465, 76, 3, 1, 'VERIFIED'),
-- Vancouver Cinemas
(4, 'Cineplex Downtown', 'owner.vancouver@cinema.ca', -123.1207, 49.2827, 0, 3, 2, 'VERIFIED'),
(5, 'Rio Theatre', 'owner.vancouver@cinema.ca', -123.0696, 49.2628, 0, 3, 2, 'VERIFIED'),
(6, 'Vancity Theatre', 'owner.toronto@cinema.ca', -123.1289, 49.2780, 0, 3, 2, 'VERIFIED'),
-- Montreal Cinemas
(7, 'Cinema Banque Scotia', 'owner.montreal@cinema.ca', -73.5673, 45.5017, 233, 3, 3, 'VERIFIED'),
(8, 'Cinéma Impérial', 'owner.montreal@cinema.ca', -73.5669, 45.5080, 233, 3, 3, 'VERIFIED'),
(9, 'Cinéma du Parc', 'owner.vancouver@cinema.ca', -73.5804, 45.5102, 233, 3, 3, 'VERIFIED');

-- Categories (Expanded)
INSERT INTO categorie (id, name) VALUES 
(1, 'Action'),
(2, 'Comedy'),
(3, 'Drama'),
(4, 'Sci-Fi'),
(5, 'Horror'),
(6, 'Romance'),
(7, 'Animation'),
(8, 'Thriller'),
(9, 'Documentary'),
(10, 'Adventure');

-- Films (Expanded)
INSERT INTO film (id, titre, duree, realisateur, description, date_sortie, categorie_id) VALUES 
(1, 'Inception', 148, 'Christopher Nolan', 'A thief who steals corporate secrets', '2024-12-01', 4),
(2, 'The Batman', 176, 'Matt Reeves', 'Batman ventures into Gotham''s underworld', '2024-12-01', 1),
(3, 'Barbie', 114, 'Greta Gerwig', 'Barbie and Ken''s adventures', '2024-12-01', 2),
(4, 'Oppenheimer', 180, 'Christopher Nolan', 'Story of J. Robert Oppenheimer', '2024-12-01', 3),
(5, 'The Holiday Spirit', 120, 'Sarah Johnson', 'A heartwarming Christmas story', '2024-12-01', 6),
(6, 'Space Warriors', 135, 'James Cameron', 'Epic space adventure', '2024-12-01', 4),
(7, 'Last Laugh', 95, 'David Fisher', 'Stand-up comedian''s life story', '2024-12-01', 2),
(8, 'Dark Waters', 142, 'Michael Bay', 'Underwater horror thriller', '2024-12-01', 5),
(9, 'Love in Paris', 110, 'Sophie Laurent', 'Romance in the city of lights', '2024-12-01', 6),
(10, 'The Last Dance', 160, 'Martin Scorsese', 'Epic crime drama', '2024-12-01', 3);

-- Standardized Salles (All cinemas have STANDARD, VIP, and PREMIUM, 4x4 layout)
-- Clear existing salles
DELETE FROM salle;
-- Insert new standardized salles for each cinema
INSERT INTO salle (id, name, nombre_places, cinema_id) 
SELECT 
    generate_series(1, 27),  -- 9 cinemas * 3 types = 27 salles
    CASE (generate_series(1, 27) - 1) % 3 
        WHEN 0 THEN 'STANDARD'
        WHEN 1 THEN 'VIP'
        WHEN 2 THEN 'PREMIUM'
    END,
    16, -- 4x4 layout for all salles
    CEIL(generate_series(1, 27)::float / 3)::integer; -- Assigns 3 salles per cinema

-- Clear existing places
DELETE FROM place;

-- Insert places for all salles (4x4 layout for each salle)
INSERT INTO place (numero, row_number, column_number, salle_id)
SELECT
    ROW_NUMBER() OVER () as numero,
    ((n-1) / 4) + 1 as row_number,  -- 4 columns, so divide by 4
    ((n-1) % 4) + 1 as column_number,
    s.id as salle_id
FROM generate_series(1, 16) n  -- 16 places per salle (4x4)
CROSS JOIN (
    SELECT id 
    FROM salle 
    ORDER BY id
) s;

-- Seances (More times throughout Dec 2-15)
INSERT INTO seance (id, heure_debut)
SELECT 
    generate_series(1, 280),
    timestamp '2024-12-02 10:00:00' +
    ((generate_series(1, 280) / 4)::integer * interval '1 day') +
    ((generate_series(1, 280) % 4)::integer * interval '3 hours');

-- Projection_Film (Multiple projections across different cinemas)
INSERT INTO projection_film (date_projection, prix, film_id, salle_id, seance_id)
SELECT
    d.date,
    CASE s.name
        WHEN 'STANDARD' THEN 15.99
        WHEN 'VIP' THEN 24.99
        WHEN 'PREMIUM' THEN 19.99
    END as prix,
    f.id as film_id,
    s.id as salle_id,
    se.id as seance_id
FROM generate_series(
    '2024-12-02'::date,
    '2024-12-15'::date,
    '1 day'::interval
) as d(date)
CROSS JOIN (SELECT id FROM film LIMIT 10) f
CROSS JOIN (SELECT id, name FROM salle LIMIT 27) s
CROSS JOIN (SELECT id FROM seance LIMIT 280) se
WHERE random() < 0.3; -- Only create some combinations, not all possible ones

-- Payments
INSERT INTO payment (id, amount, status, transaction_id, user_email, created_at, updated_at) VALUES
(1, 15.99, 'COMPLETED', 'TXN_12345', 'user1@example.ca', '2024-12-01 13:45:00', '2024-12-01 13:46:00'),
(2, 18.99, 'COMPLETED', 'TXN_12346', 'user2@example.ca', '2024-12-01 16:30:00', '2024-12-01 16:31:00'),
(3, 12.99, 'COMPLETED', 'TXN_12347', 'user1@example.ca', '2024-12-01 19:15:00', '2024-12-01 19:16:00'),
(4, 19.99, 'COMPLETED', 'TXN_12348', 'user2@example.ca', '2024-12-02 21:00:00', '2024-12-02 21:01:00');


-- Tickets
INSERT INTO ticket (id, nom_client, prix, code_payement, reservee, user_email, place_id, projection_film_id, payment_id, created_at) VALUES 
(1, 'Sarah Connor', 15.99, 12345, true, 'user1@example.ca', 1, 1, 1, '2024-12-01 13:45:00'),
(2, 'John Smith', 18.99, 12346, true, 'user2@example.ca', 2, 2, 2, '2024-12-01 16:30:00'),
(3, 'Sarah Connor', 12.99, 12347, true, 'user1@example.ca', 3, 3, 3, '2024-12-01 19:15:00'),
(4, 'John Smith', 19.99, 12348, true, 'user2@example.ca', 4, 4, 4, '2024-12-02 21:00:00');

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
