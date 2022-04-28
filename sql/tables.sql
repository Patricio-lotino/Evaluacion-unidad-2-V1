CREATE TABLE bloggers (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	first_name VARCHAR(90) NOT NULL,
	last_name VARCHAR(90) NOT NULL,
	email VARCHAR(255) NOT NULL,
	city VARCHAR(90) NOT NULL
);

CREATE TABLE stories (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	title VARCHAR(255) NOT NULL,
	content TEXT,
	topic VARCHAR(255) NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	user_id INT,
	KEY user_id_idx(user_id)
);

INSERT INTO users (first_name, last_name, email, city) VALUES (
	"Chavo", "del 8", "contacto@chavoblogger.com", "Guadalajara"
);