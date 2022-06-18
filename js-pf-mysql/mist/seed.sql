USE `db`;

SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE `product`;
TRUNCATE TABLE `sale`;
TRUNCATE TABLE `sale_product`;

SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO `product` (
  `id`, `description`, `price`, `unit`
) VALUES
  (1, 'Martelo do Thor', 100, 'un'),
  (2, 'Escudo do Capitao America', 85.70, 'un'),
  (3, 'Manopla do Thanos', 324.15, 'un'),
  (4, 'Armadura do Homem de Ferro', 753.25, 'un'),
  (5, 'Arco do Gaviao Arqueiro', 45.88, 'un');

INSERT INTO `sale` (
  `id`, `seller_name`, `purchaser_name`
) VALUES 
  (1, 'Anonymous', 'Thanos'), 
  (2, 'Wakanda', 'Capitao America');

INSERT INTO `sale_product` (
  `id`, `sale_id`, `product_id`, `description`, `quantity`, `price`, `unit`
) VALUES
  (1, 1, 1, 'Martelo do Thor', 1, 210.26, 'un'),
  (2, 1, 2, 'Escudo do Capitao America (V1)', 2, 98.10, 'un'),
  (3, 1, 3, 'Manopla do Thanos', 1, 554.15, 'un'),
  (4, 2, 5, 'Super Arco do Gaviao Arqueiro', 3, 57.66, 'un');
