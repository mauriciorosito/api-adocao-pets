CREATE DATABASE IF NOT EXISTS pet_adoption_db;

USE pet_adoption_db;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  role ENUM('admin', 'adopter') DEFAULT 'adopter'
);

CREATE TABLE pets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  age INT NOT NULL,
  species VARCHAR(50),
  size ENUM('small', 'medium', 'large'),
  status ENUM('available', 'adopted') DEFAULT 'available',
  description TEXT
);

CREATE TABLE adoptions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  pet_id INT,
  adoption_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (pet_id) REFERENCES pets(id)
);
