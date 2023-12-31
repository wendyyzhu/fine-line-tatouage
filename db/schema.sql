CREATE DATABASE finelinetatouage; 

CREATE TABLE tattoos (
    id SERIAL PRIMARY KEY, 
    title TEXT, 
    image_url TEXT,
    category TEXT, 
    artist TEXT,
    user_id INTEGER,

);

CREATE TABLE users (
    id SERIAL PRIMARY KEY, 
    email TEXT, 
    username TEXT,
    password_digest TEXT
);

CREATE TABLE likedPosts (
        id SERIAL PRIMARY KEY, 
        tattoo_id INTEGER,
        userliked_id INTEGER
);

CREATE TABLE comments (
        id SERIAL PRIMARY KEY,
        comment TEXT,
        userposted_id INTEGER, 
        postedon_id INTEGER
);

ALTER TABLE tattoos ADD column user_id INTEGER;
ALTER TABLE tattoos ADD column date_posted INTEGER;
UPDATE tattoos SET date_posted = current_date where id = ;

UPDATE tattoos SET user_id = 1;

INSERT INTO tattoos (title, image_url, category, artist) 
VALUES ('flower tattoo', 
        'https://i.pinimg.com/originals/0b/86/55/0b8655aa8a7724e5a0ddfe5afb0e85d1.jpg', 
        'floral', 
        'mr k');

INSERT INTO tattoos (title, image_url, category, artist) 
VALUES ('dream', 
        'https://inkably.co.uk/wp-content/uploads/2019/10/Untitled-3.jpg', 
        'lettering', 
        'juliana');

INSERT INTO tattoos (title, image_url, category, artist) 
VALUES ('3 dogs realistic tatto', 
        'https://images.squarespace-cdn.com/content/v1/5729d25040261d0fbc27d24f/1683865904413-TRVE43UM6WY2G99DM4VJ/r.jpg', 
        'dog', 
        'molly j');