# ANGULAR-STORE

Single Page Application that allows users to view a list of available products to purchase, add them to a shopping cart, and ultimately complete the checkout process. 

The project  has two main parts:
* Frontend: angular app generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.6
* Backend API: written in typescript/express and using postgres as the SQL DB.

This repo contains CircleCI integration to achieve CI/CD in AWS. Either way you can find as well the instructions to build & deploy manually each component in your own infrastructure.

## SHOPPING FLOW

![MyStore shopping flow](example_flow2.gif)

## CONTENTS

- [ARCHITECTURE](#ARCHITECTURE)
- [CI/CD](#CI/CD)
- [INSTRUCTIONS](#INSTRUCTIONS)
- [BACKEND](#STORE-BACKEND)
- [STORE FRONTEND](#STORE-FRONTEND)

## ARCHITECTURE

This application uses the following AWS Services:
1) Database is deployed in an RDS Postgres DB
2) Backend API is deployed using a Beanstalk for Node applications
3) Frontend is server trough an S3 Bucket

The architecture diagram is as follows:
![AWS_Architecture](AWS_Architecture.png)

## CI/CD

Within folder .circleci you can find config.yml with all the steps preconfigured to achieve the CI/CD integration. This file works in conjunction with each bin/deploy.sh files in storefront-backend-api and storefront-frontend. As well as general package.json file (that you can find in this same path):

The config.yml file forces CircleCI to use node version 14.18.1. This is due to the existing problem in version 17.1 (which is the default stable version used by CircleCI at the moment) with crypto SSL (more info searching "node 17 digital envelope routines"). 

* Step to install node@14.18.1
```
  - run: 
      name: install node@14.18.1
      command: |
          set +e         
          touch $BASH_ENV    
          curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.5/install.sh | bash
          echo 'export NVM_DIR="$HOME/.nvm"' >> $BASH_ENV
          echo '[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"' >> $BASH_ENV
          echo nvm install 14.18.1 >> $BASH_ENV
          echo nvm alias default 14.18.1 >> $BASH_ENV
```

* Install dependencies and build frontend application
```
  - run:
      name: Front-End Install
      command: |
        npm run frontend:install
  - run:
      name: Front-End Build
      command: |
        npm run frontend:build
```

* Install dependencies and build backend application
```
  - run:
      name: Back-End Install
      command: |
        npm run backend:install
  - run:
      name: Back-End Build
      command: |
        npm run backend:build
```

* Deploy frontend (to S3 bucket) and backend (to Beanstalk)
```
  - run:
      name: Front-End Deploy
      command: |
        npm run frontend:deploy
  - run:
      name: Back-End Deploy
      command: |
        npm run backend:deploy
```

## INSTRUCTIONS TO MANUAL INSTALLATION

To download the repository

```
\downloads\git clone https://github.com/IsmaelB83/angular-store.git
```

And then enter in directory storefront-backend-api, and follow instructions to start BACKEND API: [BACKEND](#STORE-BACKEND)
```
\downloads\cd angular-store\storefront-backend-api\
```

With backend-api up and running, follow instructions to start the frontend: [STORE FRONTEND](#STORE-FRONTEND)
```
\downloads\cd angular-store\storefront-frontend\
```