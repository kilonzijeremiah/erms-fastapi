CREATE TABLE class_streams (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50)
);

CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  class_stream_id INT REFERENCES class_streams(id)
);

CREATE TABLE subjects (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100)
);

CREATE TABLE scores (
  id SERIAL PRIMARY KEY,
  student_id INT,
  subject_id INT,
  marks INT
);