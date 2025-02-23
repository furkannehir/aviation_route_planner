-- Create locations table
CREATE TABLE locations (
                           id BIGSERIAL PRIMARY KEY,
                           name VARCHAR(255) NOT NULL,
                           country VARCHAR(100) NOT NULL,
                           city VARCHAR(100) NOT NULL,
                           location_code VARCHAR(10) UNIQUE NOT NULL
);


-- Create transportations table
CREATE TABLE transportations (
                                 id BIGSERIAL PRIMARY KEY,
                                 origin_id BIGINT NOT NULL,
                                 destination_id BIGINT NOT NULL,
                                 transportation_type VARCHAR(20) NOT NULL,
                                 FOREIGN KEY (origin_id) REFERENCES locations(id) ON DELETE CASCADE,
                                 FOREIGN KEY (destination_id) REFERENCES locations(id) ON DELETE CASCADE
);

-- Insert locations (Airports and city centers)
INSERT INTO locations (name, country, city, location_code) VALUES
                                                                ('Istanbul Airport', 'Turkiye', 'Istanbul', 'IST'),
                                                                ('Sabiha Gokcen Airport', 'Turkiye', 'Istanbul', 'SAW'),
                                                                ('Berlin Brandenburg Airport', 'Germany', 'Berlin', 'BER'),
                                                                ('Paris Charles de Gaulle Airport', 'France', 'Paris', 'CDG'),
                                                                ('Madrid Barajas Airport', 'Spain', 'Madrid', 'MAD'),
                                                                ('Tokyo Narita Airport', 'Japan', 'Tokyo', 'NRT'),
                                                                ('Los Angeles International Airport', 'USA', 'Los Angeles', 'LAX'),
                                                                ('Dubai International Airport', 'UAE', 'Dubai', 'DXB'),
                                                                ('London Heathrow Airport', 'UK', 'London', 'LHR'),
                                                                ('New York JFK Airport', 'USA', 'New York', 'JFK'),
                                                                ('Taksim Square', 'Turkiye', 'Istanbul', 'TAK'),
                                                                ('Kadikoy Square', 'Turkiye', 'Istanbul', 'KAD'),
                                                                ('Kreuzberg', 'Germany', 'Berlin', 'KRE'),
                                                                ('Montmartre', 'France', 'Paris', 'MON'),
                                                                ('Sol', 'Spain', 'Madrid', 'SOL'),
                                                                ('Shinjuku', 'Japan', 'Tokyo', 'SHI'),
                                                                ('Hollywood', 'USA', 'Los Angeles', 'HOL'),
                                                                ('Burj Khalifa', 'UAE', 'Dubai', 'BUR'),
                                                                ('Buckingham Palace', 'UK', 'London', 'BUC'),
                                                                ('Central Park', 'USA', 'New York', 'CPK');

-- Insert transportations (Flights, buses, and Uber connections)
INSERT INTO transportations (origin_id, destination_id, transportation_type) VALUES
                                                             (1, 2, 'BUS'),  -- SAW -> IST
                                                             (2, 1, 'BUS'),  -- IST -> SAW
                                                             (3, 4, 'FLIGHT'),  -- Berlin -> Paris
                                                            (4, 3, 'FLIGHT'),  -- Paris -> Berlin
                                                            (5, 6, 'FLIGHT'),  -- Madrid -> Tokyo
                                                            (6, 5, 'FLIGHT'),  -- Tokyo -> Madrid
                                                            (7, 8, 'FLIGHT'),  -- Los Angeles -> Dubai
                                                            (8, 7, 'FLIGHT'),  -- Dubai -> Los Angeles
                                                            (9, 10, 'FLIGHT'),  -- London -> New York
                                                            (10, 9, 'FLIGHT'),  -- New York -> London
                                                             (2, 9, 'FLIGHT'),  -- IST -> London
                                                             (1, 10, 'FLIGHT'),  -- SAW -> New York
                                                            (11, 2, 'UBER'),  -- Taksim -> IST
                                                            (12, 1, 'UBER'),  -- Kadikoy -> SAW
                                                            (13, 3, 'BUS'),  -- Kreuzberg -> BER
                                                            (14, 4, 'UBER'),  -- Montmartre -> CDG
                                                            (15, 5, 'UBER'),  -- Sol -> Madrid
                                                            (16, 6, 'UBER'),  -- Shinjuku -> Tokyo
                                                            (17, 7, 'UBER'),  -- Hollywood -> LAX
                                                            (18, 8, 'UBER'),  -- Burj Khalifa -> DBX
                                                            (19, 9, 'UBER'),  -- Buckingham Palace -> London
                                                            (20, 10, 'UBER');  -- Central Park -> JFK
