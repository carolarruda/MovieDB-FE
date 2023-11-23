# Movie Database with User Authentication

Welcome to the Movie Database project! This application allows users to authenticate and manage their movie collections. Keep track of your favorite movies, discover new ones, and more!


![Login](https://github.com/carolarruda/movieDb/blob/main/src/gifs/login.gif?raw=true)
![addMovie](https://github.com/carolarruda/movieDb/blob/main/src/gifs/addMovie.gif?raw=true)

## Table of Contents
- [Movie Database](#movie-database)
- [Movie Database with User Authentication](#movie-database-with-user-authentication)
  - [Table of Contents](#table-of-contents)
  - [Demo](#demo)
  - [Features](#features)
  - [Setting up](#setting-up)
  - [Instructions](#instructions)

## Demo

To see a live demo of the Movie Database, visit [Demo Link](https://movie-db-seven-chi.vercel.app/).

## Features

- User Authentication:
  - Register an account
  - Log in securely
- Movie Management:
  - Add movies to your collection
- User-Friendly Interface:
  - Intuitive and easy-to-navigate design
- Secure and Scalable:
  - Built with security in mind
  - Ready for scaling to accommodate more users

## Setting up

1. Fork this repository and clone the fork.
2. Rename `.env.example` to `.env`
3. Edit the `DATABASE_URL` variable in `.env`, swapping `YOUR_DATABASE_URL` for the URL of the database you just created. Leave `?schema=prisma` at the end.
4. Edit the `SHADOW_DATABASE_URL` variable in `.env`, swapping `YOUR_SHADOW_DATABASE_URL` for the URL of a shadow database you created in an earlier exercise. Leave `?schema=shadow` at the end.
5. Run `npm ci` to install the project dependencies.
6. Run `npx prisma migrate reset` to execute the database migrations. Press `y` when it asks if you're sure.

## Instructions

- Run the app with `npm start` - this will open a React app in your browser *and* run the express server. The server will default to port `4000`, you can change this by adding an `API_PORT` variable to your `.env` if you want.
