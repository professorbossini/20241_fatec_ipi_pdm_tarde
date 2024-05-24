-- Active: 1715685873518@@localhost@5432@20241_fatec_ipi_pdmt@public


SELECT * FROM tb_lembrete;


INSERT INTO tb_lembrete (texto) VALUES
('Fazer café'),
('Ver um filme');



--postgresql
CREATE TABLE tb_lembrete(
  id SERIAL PRIMARY KEY,
  texto VARCHAR(1000) NOT NULL
);
--mysql
-- CREATE TABLE tb_lembrete(
--   id INT PRIMARY KEY AUTO_INCREMENT,
--   texto VARCHAR(1000) NOT NULL
-- );