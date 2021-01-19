CREATE DATABASE "my_teacher";

-- criando tabela teachers
CREATE TABLE "teachers" (
    "id" INT PRIMARY KEY,
    "avatar_url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "birth_date" TIMESTAMP NOT NULL,
    "education_level" TEXT NOT NULL,
    "class_type" TEXT NOT NULL,
    "subjects_taught" TEXT NOT NULL,
    "created_at" TIMESTAMP NOT NULL,
);

-- criando tabela students
create TABLE "students" (
    "id" INT PRIMARY KEY,
    "avatar_url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "birth" TIMESTAMP NOT NULL,
    "school_grade" TEXT NOT NULL,
    "workload" TEXT NOT NULL,
);

-- adicionando default em created_at 
ALTER TABLE "teachers" ALTER "created_at" SET DEFAULT (now());