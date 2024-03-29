# Rust, NextJs, dokerized postgres app
## Description
Dockerize your postgres database and play with Rust and NextJs programming languages !
It's quite a copy-paste of Francesco Ciulla's tutorial, but I removed axios library to let you free to choose or create yours.  

Second thing, Francesco Ciulla's tutorial help you to create and dockerise postgres, rust and nextJs, perfect !  
But to develop, I needed to run locally rust and nextJs.  

Once done, I will need to dockerize them !  
To dockerize all application, you can look at ./rust-next-pg/compose.yaml.dokerize.all.example file. I din't try it, maybe it has to be modified.  

Enjoy!

# Sources
Big up Francesco Ciulla for your tutorial !  

## Tutorial
https://dev.to/francescoxx/build-a-full-stack-app-with-rust-nextjs-and-docker-436h  
## Github project
https://github.com/FrancescoXX/fullstack-rust-nextjs  
## Youtube
https://www.youtube.com/watch?v=77RjzJtC_g4


# Prerequisites
- docker
- docker compose
- rust and cargo (https://doc.rust-lang.org/book/)

# Getting started

## Postgres database
From root project:  
`rust-next-pg/`
```bash
docker compose up -d
```
## Rust app
From Rust app  
`rust-next-pg/backend/`
```bash
cargo run
```
## Nextjs app
From NextJs app  
`rust-next-pg/frontend/`
```bash
npm run dev
```
