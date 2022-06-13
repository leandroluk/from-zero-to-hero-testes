DROP DATABASE IF EXISTS `db`;
CREATE DATABASE `db`;
USE `db`;

CREATE TABLE `product` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `description` VARCHAR(100) NOT NULL,
  `price` FLOAT NOT NULL,
  `unit` VARCHAR(20) NOT NULL
);

CREATE TABLE `sale` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `seller_name` VARCHAR(100) NOT NULL,
  `purchaser_name` VARCHAR(100) NOT NULL
);

CREATE TABLE `sale_product` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `sale_id` INT NOT NULL,
  `product_id` INT NULL,
  `description` VARCHAR(100) NOT NULL,
  `quantity` FLOAT NOT NULL,
  `price` FLOAT NOT NULL,
  `unit` VARCHAR(20) NOT NULL,
  FOREIGN KEY (`sale_id`) REFERENCES `sale` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE SET NULL
);
