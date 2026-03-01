-- Contraseña: admin1234 (hash BCrypt generado previamente)
INSERT INTO usuarios (nombre, apellido, username, carnet, password, rol)
VALUES 
  ('Admin', 'OTIC', 'admin_otic', 'C-0001', '$2b$10$...hash...', 'coordinador'),
  ('Sebastián',  'Istúriz', 'tecnico_01', 'C-0002', '$2b$10$...hash...', 'tecnico');