-- Seleciona o banco de dados
USE pet_adoption_db;

-- Limpa os dados existentes (cuidado ao usar em produção)
DELETE FROM adoptions;
DELETE FROM pets;
DELETE FROM users;

-- Inserção de usuários
INSERT INTO users (name, email, password, phone, role) VALUES
('Admin User', 'admin@example.com', '$2a$08$kJxN/6K1QJgtnzZn0oBQ8Ol/ztCq8lK2L/c0s0v8UMgr2AfqjCm9C', '555-1234', 'admin'),
('Joana Silva', 'joana@example.com', '$2a$08$kJxN/6K1QJgtnzZn0oBQ8Ol/ztCq8lK2L/c0s0v8UMgr2AfqjCm9C', '555-5678', 'adopter'),
('Carlos Souza', 'carlos@example.com', '$2a$08$kJxN/6K1QJgtnzZn0oBQ8Ol/ztCq8lK2L/c0s0v8UMgr2AfqjCm9C', '555-9999', 'adopter');

-- Senha de todos os usuários: 123456 (bcrypt hash)

-- Inserção de pets disponíveis
INSERT INTO pets (name, age, species, size, status, description) VALUES
('Thor', 3, 'dog', 'large', 'available', 'Pastor alemão muito dócil'),
('Luna', 1, 'cat', 'small', 'available', 'Gatinha branca muito carinhosa'),
('Max', 2, 'dog', 'medium', 'available', 'Cão de porte médio, ótimo com crianças'),
('Mimi', 5, 'cat', 'small', 'adopted', 'Foi adotada por Joana'),
('Rex', 4, 'dog', 'large', 'adopted', 'Adotado por Carlos, muito ativo');

-- Inserção de adoções anteriores
INSERT INTO adoptions (user_id, pet_id) VALUES
(2, 4), -- Joana adotou Mimi
(3, 5); -- Carlos adotou Rex
