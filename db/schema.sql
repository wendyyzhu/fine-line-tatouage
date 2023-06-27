CREATE DATABASE finelinetatouage; 

CREATE TABLE tattoos (
    id SERIAL PRIMARY KEY, 
    title TEXT, 
    image_url TEXT,
    category TEXT, 
    tattoo_artist TEXT
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY, 
    email TEXT, 
    username TEXT,
    password_digest TEXT
);

ALTER TABLE tattoos ADD column user_id INTEGER;

UPDATE tattoos SET user_id = 1;

INSERT INTO tattoos (title, image_url, category, tattoo_artist) 
VALUES ('flower tattoo', 
        'https://i.pinimg.com/originals/0b/86/55/0b8655aa8a7724e5a0ddfe5afb0e85d1.jpg', 
        'floral', 
        'mr k');

INSERT INTO tattoos (title, image_url, category, tattoo_artist) 
VALUES ('dream', 
        'https://inkably.co.uk/wp-content/uploads/2019/10/Untitled-3.jpg', 
        'lettering', 
        'juliana');

INSERT INTO tattoos (title, image_url, category, tattoo_artist) 
VALUES ('3 dogs realistic tatto', 
        'https://images.squarespace-cdn.com/content/v1/5729d25040261d0fbc27d24f/1683865904413-TRVE43UM6WY2G99DM4VJ/r.jpg', 
        'dog', 
        'molly j');