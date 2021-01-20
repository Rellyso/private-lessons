-- para excluir e recriar esquema em cascata 
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

-- excluir e recriar caso exista a base de dados my_teacher
DROP DATABASE IF EXISTS my_teacher;
CREATE DATABASE my_teacher;

CREATE DATABASE my_teacher;

-- criando tabela teachers
CREATE TABLE "teachers" (
    "id" SERIAL PRIMARY KEY,
    "avatar_url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "birth_date" TIMESTAMP NOT NULL,
    "education_level" TEXT NOT NULL,
    "class_type" TEXT NOT NULL,
    "subjects_taught" TEXT NOT NULL,
    "created_at" TIMESTAMP NOT NULL
);

-- criando tabela students
create TABLE "students" (
    "id" SERIAL PRIMARY KEY,
    "avatar_url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "birth_date" TIMESTAMP NOT NULL,
    "school_level" TEXT NOT NULL,
    "workload" TEXT NOT NULL
);

-- adicionando default em created_at 
ALTER TABLE "teachers" ALTER "created_at" SET DEFAULT (now());

-- adicionando teacher_id em students
ALTER TABLE "students" ADD COLUMN "teacher_id" int NOT NULL;
-- adicionando chave estrangeira em students para referenciar id de users
ALTER TABLE "students" ADD FOREIGN KEY ("teacher_id") REFERENCES "teachers" ("id");

-- PARA RODAR AS SEEDS

DELETE FROM teachers;
DELETE FROM students;

-- REINICIAR AUTOINCREMENT DOS IDs NAS TABELAS
ALTER SEQUENCE teachers_id_seq RESTART WITH 1;
ALTER SEQUENCE students_id_seq RESTART WITH 1;