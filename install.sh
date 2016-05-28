#!/usr/bin/env bash
USERNAME='root'
PASSWORD=''
DBNAME='Invaders'
HOST='localhost'

USER_USERNAME='adam'
USER_PASSWORD='1996'

MySQL=$(cat <<EOF
DROP DATABASE IF EXISTS $DBNAME;
CREATE DATABASE $DBNAME DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
DELETE FROM mysql.user WHERE user='$USER_USERNAME' and host='$USER_PASSWORD';
GRANT ALL PRIVILEGES ON $DBNAME.* to '$USER_USERNAME'@'$HOST' IDENTIFIED BY '$USER_PASSWORD' WITH GRANT OPTION;

USE $DBNAME;

CREATE TABLE users (
	id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	login VARCHAR(30) NOT NULL,
	password VARCHAR(30) NOT NULL,
	nickname VARCHAR(30) NOT NULL,
	email VARCHAR(50),
	token VARCHAR(100),
	validate INT(1)
);
CREATE TABLE profiles (
	id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	user_id INT(11) UNSIGNED,
	avatar VARCHAR(100),
	presentation TEXT,
	CONSTRAINT user_id_users_FK FOREIGN KEY (user_id) REFERENCES users(id) 
	

);
CREATE TABLE scores (
	id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	user_id INT(11) UNSIGNED,
	score INT(11),
	CONSTRAINT user_id_scores_FK FOREIGN KEY (user_id) REFERENCES users(id) 

);
CREATE TABLE posts (
	id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	user_id INT(11) UNSIGNED,
	content_post TEXT,
	CONSTRAINT user_id_posts_FK FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE

);
CREATE TABLE comments (
	id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	user_id INT(11) UNSIGNED,
	post_id INT(11) UNSIGNED,
	content_com TEXT,
	nickname VARCHAR(100),
	CONSTRAINT post_id_comments_FK FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
	CONSTRAINT user_id_comments_FK FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE

);

CREATE TABLE friends (
	id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	user_id1 INT(11) NOT NULL,
	user_id2 INT(11) NOT NULL,
	validate INT(1)
);

EOF
)

echo $MySQL | mysql --user=$USERNAME --password=$PASSWORD
