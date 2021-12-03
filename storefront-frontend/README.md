# MyStore

MyStore is an SPA Angular application that allows users to view a list of available products to purchase, add them to a shopping cart, and ultimately complete the checkout process. 

The project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.6, and is the 3rd project of Udacity's Javascript Full stack Nanodegree.

## CONTENTS

- [INSTRUCTIONS](#INSTRUCTIONS)
  - [Shopping-flow](#Shopping-flow)
  - [Download](#Download)
  - [Download and start backend](#Download-and-start-backend)
  - [Install dependencies](#Install-dependencies)
  - [Start application](#Start-application)
- [DEPENDENCIES](#DEPENDENCIES)


## INSTRUCTIONS

<b>IMPORTANT NOTE</b> This SPA application should be use in conjunction with the related API that can be found in following repo https://github.com/IsmaelB83/storefront-backend-api.git. That means, in order to be able to run this frontend, you need first to clone the API repository build it and start it (npm start).

For detailed instructions in order to know how to build/run the API please refer to its corresponding README file (https://github.com/IsmaelB83/storefront-backend-api/blob/master/README.md)

In this repo the current API_SERVER is indicated in file: app/services/config.ts
```
const API_SERVER = 'https://autodeluxegarage.es:8444'

export default API_SERVER;
```

<strong>For the moment, until this project is reviewed by udacity team, the api is listing in one of my servers. Later on that will be discontinued, and therefore in order you to run this app, you will need to deploy the API server on your own localhost/server.</strong>

### Shopping Flow

![MyStore shopping flow](example_flow2.gif)

### Download

To download the repository

```
\downloads\git clone https://github.com/IsmaelB83/mystore.git
```

### Download and start backend

To download and start the API refer to instructions and repository in this link https://github.com/IsmaelB83/storefront-backend-api.git

### Install dependencies

Install all the required npm packages by:
```
\downloads\mystore\npm install
```

### Start application

Once everything is configured just need to run ng serve to start the SPA:

```
\downloads\mystore\ng serve --port 4000
```

After that navigate to http://localhost:4000/ in your browser.

<b>Note:</b> In case you omit the '--port 4000', the application will be started in the default port for Angular-Cli which is 4200.

<b>Important Note:</b> Make sure that the backend API is already started and listening on localhost:3000. Which is the default port that the Angular application will try to connect to fetch data, etc. In future versions of this repo, this will be implemented in a specific configuration section of the application. So that the user is able to modify connection information.

## Project Instructions

The main features included in this application simulates a simple real-world e-commerce website, including a):

* **Login**, makes it possible for a specific user to log in into the application in order to access the private section of the web app.
* **Product list** page, which displays the available products for the user to choose and add to their cart (in various quantities). Also available in the public section of the webapp.
* **Product details** page, which displays more information about any particular product. Also available in the public section of the webapp (except those functionalities related to add to cart products).
* **Shopping cart**, which includes the products that the user has added to their cart.
* **Checkout form**, which collects information about the user (e.g., name, address, payment details, etc.).
* **Order confirmation page**, which shows the outcome after the user completes the checkout process (i.e., submits the checkout form).

## DEPENDENCIES

This application makes use of the following packages

### Angular componentes
- "@angular/animations": "^12.2.9"
- "@angular/common": "~12.2.0" - HttpClientModule
- "@angular/compiler": "~12.2.0"
- "@angular/core": "~12.2.0"
- "@angular/forms": "~12.2.0" - FormsModule
- "@angular/localize": "~12.2.0"
- "@angular/platform-browser": "~12.2.0" - BrowserAnimationsModule
- "@angular/platform-browser-dynamic": "~12.2.0"
- "@angular/router": "~12.2.0"
- "@auth0/angular-jwt": "^5.0.2"

### Styling and UX
- "@ng-bootstrap/ng-bootstrap": "^10.0.0" - NgbModule
- "bootstrap": "^4.5.0"
- "ngx-toastr": "^14.1.3" - ToastrModule
