Users should have a first_name, last_name, email, password
User should be able to signup and sign in into the Blog App.
A blog can only be in two state; draft and published
User should be able to login with Passport using JWT as authentication strategy and expire the token after 1 hour
Implement basic auth.
Users should be able to get the Blogs - logged in and not logged in users
when a Blog is created, it is in draft state
Login Users should be able to create a Blog.
The owner of the Blog should be able to update and edit the Blog.
The owner of the Blog should be able to get a list of their blogs
The endpoint is paginated to 20 blogs per page
It should be filterable by state
Blogs created should have title, description, tags, author, timestamp, state, read_count, reading_time and body
Test application


Setup / Installation
Install NodeJS, Mongodb
pull / clone this repo
install npm packages npm install
update env variables in .env


User
field	data_type	constraints
email	string	required
first_name	string	required
last_name	string	required
password	string	required
Blog
field	data_type	constraints
title	string	required
description	string	required
author	string	not-required
state	string	default: draft
read_count	number	not-required
reading_time	string	not-required
tags	string	required
body	string	required
timestamp	date	not-required
