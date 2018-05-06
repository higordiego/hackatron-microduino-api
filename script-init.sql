-- Script init

-- Students
insert into Students (id, name,discipline,created_at, updated_at) values (1, 'Higor Diego', 'Matemática', now(), now());
insert into Students (id, name,discipline,created_at, updated_at) values (2, 'Bruna Oliveira', 'Matemática', now(), now());
insert into Students (id, name,discipline,created_at, updated_at) values (3, 'Manu', 'Matemática', now(), now());
insert into Students (id, name,discipline,created_at, updated_at) values (4, 'Suely', 'Matemática', now(), now());


-- Triggers

insert into Students (id, name, description, created_at, updated_at) values (1, 'Atribuições de Valores - Funções', 'A maioria dos predicados representam valores, verdadeiro ou falso. Por exemplo, ao escrever-se a(A, B), temos que esta expressão pode ser verdadeira ou falsa. Uma função parece com um predicato, mas representa um valor. cos(0), por exemplo, não é nem verdadeiro nem falso, mas o valor 1.', now(), now());
insert into Triggers (id, name, description, created_at, updated_at) values (2, 'Funções Matemáticas', 'Ao conjunto {\displaystyle D\,\!} {\displaystyle D\,\!} denomina-se domínio da função, sendo seus elementos denominados abscissas, e ao conjunto {\displaystyle C\,\!} {\displaystyle C\,\!} denomina-se contra-domínio, sendo seus elementos denominados ordenadas ou imagens, quando estas se correlacionarem a um elemento de {\displaystyle D\,\!} {\displaystyle D\,\!}.', now(), now());


-- Users
insert into Users (id, cpf, password, status, created_at, updated_at) values (1, '03506838326', md5('123456'), true, now(), now())


