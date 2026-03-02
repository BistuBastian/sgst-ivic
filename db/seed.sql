INSERT INTO usuarios (nombre, apellido, username, carnet, password, rol)
VALUES
('Admin', 'OTIC', 'admin_otic', 'C-0001', '$2b$10$Hj7rw1JH6ohCa8OR5ljP5uSKoU4VhjJ8XbspAdyF4Fu.11aZWKFu6', 'coordinador'),
('Sebastián', 'Istúriz', 'tecnico_01', 'C-0003', '$2b$10$nw3TLgoV5qk5JjJpmIgZCeNRt.ylYqLxAaMn.JnVI.5rTIVYAezj6', 'tecnico'),  
('Ronald', 'Palacios', 'tecnico_02', 'C-0004', '$2b$10$nw3TLgoV5qk5JjJpmIgZCeNRt.ylYqLxAaMn.JnVI.5rTIVYAezj6', 'tecnico');  

INSERT INTO casos (numero_ticket, tecnico_id, estado)
VALUES
('OTIC-0001', (SELECT id FROM usuarios WHERE username = 'tecnico_01'), 'pendiente'),
('OTIC-0002', (SELECT id FROM usuarios WHERE username = 'tecnico_01'), 'en_proceso'),
('OTIC-0003', (SELECT id FROM usuarios WHERE username = 'tecnico_02'), 'resuelto'),
('OTIC-0004', (SELECT id FROM usuarios WHERE username = 'tecnico_02'), 'en_proceso'),
('OTIC-0005', (SELECT id FROM usuarios WHERE username = 'tecnico_02'), 'pendiente');

