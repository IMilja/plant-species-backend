# Plant Species Backend
This repository contains the backend API built for my (Professional) Master thesis where I developed an application for storing information about different plant species, subspecies, useful parts and etc.

This API is build on top of NodeJs and is build as a REST API containing GET, POST, PATCH and DELETE methods for the selected resources.
This backend also has an implemantaion of authentication endpoints and functionalities like password reset as well as authorization so POST, PATCH and DELETE methods can only be accessed by users
with the role SUPER_ADMIN.

## Technologies used
  - Node.Js
  - Express.js
  - Firebase
  - Objection.js
  - Multer
  - MySQL


## Deployment
A brief summary on how to deploy the backend for the plant-species project

### Requirements
- Nginx/Apache
- [PM2](https://pm2.keymetrics.io/)
- Firebase Project

### Instructions
- Transfer the directory of the backend to the server folder `/var/www` and `cd` into it
- Copy paste the `.env.example` file to `.env` and populate all parameters (some parameters are described below)
  - FIREBASE_PROJECT_ID:
    1. Open the Firebase project
    2. Go to Settings
    3. General
    4. Copy the Project ID and paste it into the `.env` file
  - FIREBASE_KEY:
    1. Open the Firebase project
    2. Go to Settings
    3. Service accounts
    4. Choose Node.js and click Generate new private key
    5. Rename the file to `firebase.json` and transfer it to the root folder of the project
    6. Set the value of the `.env` parameter to the file name `firebase.json`
  - FIREBASE_BUCKET:
    1. Open the Firebase project
    2. Go to Storage and enable the service
    3. Take the value after the `gs://` prefix of the url and set it as the value of the `.env` parameter
  - FRONTEND_DOMAIN:
    - Example: for the URL: https://biljne-vrste.huxian.me/ the value of the `.env` parameter has to be set to biljne-vrste.huxian.me
  - BACKEND_DOMAIN:
    - Example: for the URL: https://biljne-vrste-api.huxian.me/ the value of the `.env` parameter has to be set to biljne-vrste-api
  - NODE_ENV:
    - For a production environment set it to `production`
  - JWT_SECRET:
    - Set the value of the `.env` parameter to a random generated string [Example](https://randomkeygen.com/)
- Run the command `npm install` to install all project dependencies
- Run the command `npx knex migrate:latest` to create the database schema and tables
- Run the command `npx knex seed:run` to populate tables with values from the `seeds` folder
- Run the command `pm2 start app.js --name=plant-species-backend`
- Go into the `nginx/apache` config and setup a `reverse proxy` to the application you ran with `pm2` manager (Example of the `config` file for nginx below)
  ```
  server {
        server_name biljne-vrste-api.huxian.me;

        location / {
                proxy_set_header   X-Forwarded-For $remote_addr;
                proxy_set_header   Host $http_host;
                proxy_pass         http://localhost:3000;
        }
  }
  ```
- Run the following script to create the first user in the application
```
./scripts/CreateSuperAdmin.js create-super-admin create-super-user --email=mail@domain.com --password=testpassword
```
- The backend for the project should be set now
