# RESTful API

This project use **Express.JS && Sequelize**, and it's a full REST api. You can Read/Create/Update/Delete data of database.

## How to use

You just need have access into a mysql database, and copy the _'.env.local.example'_ and rename to _'.env.local'_ with the credentials of your database.

```
PORT=3000
DATABASE=
ADMIN=
PASS=
HOST=
```

By default, this application was using mySql database, but if you need, can search at the documentacion of Sequelize, to more details

---

## << IMPORTANT >>

_this application using json format, then all requests must be in JSON, if you want, you can edit this._

---

## Routes
CRUD

```JS
'/api/' (GET)

// Return all data from database 
```
```JS
'/api/' (POST)

{
    name: "User name",
    dateOfBirth: "YYYY/MM/DD", // !!!  IMPORTANT  !!!
    address: "",
    description: ""
}

// Create an new user

// DATE OF BRITH, YOU MUST TO SEND A DATA IN THIS FORMAT (YYYY/MM/DD)

// AT ADDRESS, YOU CAN WRITE ANY STRING, BUT IF YOU INSERT CEP ONLY NUMBERS (12345678), THE APPLICATION WILL GET SEARCH AT BRASIL API, AND RETURN A FULL ADDRESS
```
```JS
'/api/update/ID' (PUT)

{
    name: "User name",
    dateOfBirth: "YYYY/MM/DD", // !!!  IMPORTANT  !!!
    address: "",
    description: ""
}

// Update user

// DATE OF BRITH, YOU MUST TO SEND A DATA IN THIS FORMAT (YYYY/MM/DD)

// AT ADDRESS, YOU CAN WRITE ANY STRING, BUT IF YOU INSERT CEP ONLY NUMBERS (12345678), THE APPLICATION WILL GET SEARCH AT BRASIL API, AND RETURN A FULL ADDRESS
```
```JS
'/api/delete/ID' (DELETE)


// Delete a user
```
