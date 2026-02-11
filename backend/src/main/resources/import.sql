INSERT INTO tb_user(id, name, document, email, password, phone) VALUES (RANDOM_UUID(), 'Eduardo Gollner', '111.111.111-11', 'eduardo@email.com', '123456', '(27) 99999-0001');
INSERT INTO tb_user(id, name, document, email, password, phone) VALUES (RANDOM_UUID(), 'Ana Paula', '222.222.222-22', 'ana.paula@email.com', '123456', '(27) 99999-0002');
INSERT INTO tb_user(id, name, document, email, password, phone) VALUES (RANDOM_UUID(), 'Carlos Mendes', '333.333.333-33', 'carlos.mendes@email.com', '123456', '(27) 99999-0003');
INSERT INTO tb_client(id, name, document, email, phone, user_id) VALUES (RANDOM_UUID(), 'João Silva', '123.456.789-00', 'joao.silva@email.com', '(27) 99999-1111', (SELECT id FROM tb_user LIMIT 1));
INSERT INTO tb_client(id, name, document, email, phone, user_id) VALUES (RANDOM_UUID(), 'Maria Oliveira', '987.654.321-00', 'maria.oliveira@email.com', '(27) 98888-2222', (SELECT id FROM tb_user LIMIT 1 OFFSET 1));
INSERT INTO tb_client(id, name, document, email, phone, user_id) VALUES (RANDOM_UUID(), 'Lucas Almeida', '159.753.486-00', 'lucas.almeida@email.com', '(27) 95555-5555', (SELECT id FROM tb_user LIMIT 1 OFFSET 2));
