CREATE DATABASE IF NOT EXISTS mi_castillo;
USE mi_castillo;

-- Tabla de visitantes (para el contador)
CREATE TABLE visitantes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ip VARCHAR(45),
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de usuarios (funcionalidad del castillo)
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    rol ENUM('rey', 'noble', 'plebeyo') DEFAULT 'plebeyo',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Datos iniciales del reino
INSERT INTO usuarios (nombre, email, rol) VALUES 
('Rey Monolito', 'rey@castillo.com', 'rey'),
('Duque DevOps', 'devops@castillo.com', 'noble'),
('Sir Docker', 'docker@castillo.com', 'noble'),
('Campesino PHP', 'php@castillo.com', 'plebeyo'),
('Lady MySQL', 'mysql@castillo.com', 'noble');

-- Tabla de productos (inventario del castillo)
CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    precio DECIMAL(10,2),
    stock INT DEFAULT 0,
    categoria VARCHAR(50)
);

INSERT INTO productos (nombre, precio, stock, categoria) VALUES 
('Espada Láser Docker', 299.99, 5, 'Armas'),
('Escudo Anti-Bug', 199.50, 3, 'Defensa'),
('Poción de Caffeine++', 15.99, 100, 'Consumibles'),
('Manual de Kubernetes', 89.99, 25, 'Libros'),
('Container Mágico', 45.00, 50, 'Herramientas');
