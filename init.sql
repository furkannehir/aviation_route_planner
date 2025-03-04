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
                                 transportation_days VARCHAR(100) NOT NULL,
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
INSERT INTO transportations (origin_id, destination_id, transportation_type, transportation_days) VALUES
                                                                                                      (1, 2, 'BUS', 'MONDAY,TUESDAY'),  -- SAW -> IST
                                                                                                      (1, 10, 'FLIGHT', 'MONDAY,TUESDAY'),  -- SAW -> New York
                                                                                                      (1,3, 'FLIGHT', 'TUESDAY'),  -- SAW -> Berlin
                                                                                                      (1, 4, 'FLIGHT', 'WEDNESDAY'),  -- SAW -> Paris
                                                                                                      (1, 5, 'FLIGHT', 'THURSDAY'),  -- SAW -> Madrid
                                                                                                      (1, 6, 'FLIGHT', 'FRIDAY'),  -- SAW -> Tokyo
                                                                                                      (1, 7, 'FLIGHT', 'SATURDAY'),  -- SAW -> Los Angeles
                                                                                                      (1, 8, 'FLIGHT', 'SUNDAY'),  -- SAW -> Dubai
                                                                                                      (2, 1, 'BUS', 'FRIDAY,SATURDAY'),  -- IST -> SAW
                                                                                                      (2, 9, 'FLIGHT', 'MONDAY,FRIDAY'),  -- IST -> London
                                                                                                      (2, 10, 'FLIGHT', 'SATURDAY'),  -- IST -> New York
                                                                                                      (2, 3, 'FLIGHT', 'THURSDAY,SUNDAY'),  -- IST -> Berlin
                                                                                                      (2, 4, 'FLIGHT', 'MONDAY'),  -- IST -> Paris
                                                                                                      (2, 5, 'FLIGHT', 'TUESDAY'),  -- IST -> Madrid
                                                                                                      (2, 6, 'FLIGHT', 'WEDNESDAY'),  -- IST -> Tokyo
                                                                                                      (2, 7, 'FLIGHT', 'THURSDAY'),  -- IST -> Los Angeles
                                                                                                      (2, 8, 'FLIGHT', 'FRIDAY'),  -- IST -> Dubai
                                                                                                      (3, 1, 'FLIGHT', 'SATURDAY'),  -- Berlin -> SAW
                                                                                                      (3, 9, 'FLIGHT', 'SUNDAY'),  -- Berlin -> London
                                                                                                      (3, 4, 'FLIGHT', 'WEDNESDAY'),  -- Berlin -> Paris
                                                                                                      (4, 3, 'FLIGHT', 'SATURDAY,SUNDAY'),  -- Paris -> Berlin
                                                                                                      (5, 6, 'FLIGHT', 'FRIDAY,SATURDAY'),  -- Madrid -> Tokyo
                                                                                                      (6, 5, 'FLIGHT', 'TUESDAY,SATURDAY,SUNDAY'),  -- Tokyo -> Madrid
                                                                                                      (7, 8, 'FLIGHT', 'TUESDAY,SATURDAY'),  -- Los Angeles -> Dubai
                                                                                                      (8, 7, 'FLIGHT', 'SATURDAY,SUNDAY'),  -- Dubai -> Los Angeles
                                                                                                      (9, 10, 'FLIGHT', 'FRIDAY,SATURDAY'),  -- London -> New York
                                                                                                      (10, 9, 'FLIGHT', 'MONDAY,TUESDAY,WEDNESDAY,THURSDAY,FRIDAY,SATURDAY,SUNDAY'),  -- New York -> London
                                                                                                      (11, 2, 'UBER', 'MONDAY,TUESDAY,WEDNESDAY,THURSDAY,FRIDAY,SATURDAY,SUNDAY'),  -- Taksim -> IST
                                                                                                      (12, 1, 'UBER', 'MONDAY,TUESDAY,WEDNESDAY,THURSDAY,FRIDAY,SATURDAY,SUNDAY'),  -- Kadikoy -> SAW
                                                                                                      (13, 3, 'BUS', 'WEDNESDAY,THURSDAY'),  -- Kreuzberg -> BER
                                                                                                      (14, 4, 'UBER', 'MONDAY,WEDNESDAY'),  -- Montmartre -> CDG
                                                                                                      (15, 5, 'UBER', 'MONDAY,TUESDAY,WEDNESDAY,THURSDAY,FRIDAY,SATURDAY,SUNDAY'),  -- Sol -> Madrid
                                                                                                      (16, 6, 'UBER', 'MONDAY,TUESDAY,WEDNESDAY,THURSDAY,FRIDAY,SATURDAY,SUNDAY'),  -- Shinjuku -> Tokyo
                                                                                                      (17, 7, 'UBER', 'MONDAY,TUESDAY,WEDNESDAY,THURSDAY,FRIDAY,SATURDAY,SUNDAY'),  -- Hollywood -> LAX
                                                                                                      (18, 8, 'UBER', 'MONDAY,TUESDAY,WEDNESDAY,THURSDAY,FRIDAY,SATURDAY,SUNDAY'),  -- Burj Khalifa -> DBX
                                                                                                      (19, 9, 'UBER', 'MONDAY,TUESDAY,WEDNESDAY,THURSDAY,FRIDAY,SATURDAY,SUNDAY'),  -- Buckingham Palace -> London
                                                                                                      (20, 10, 'UBER', 'MONDAY,TUESDAY,WEDNESDAY,THURSDAY,FRIDAY,SATURDAY,SUNDAY');  -- Central Park -> JFK
