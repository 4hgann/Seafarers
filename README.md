# Seafarers

## Introduction

In 2022, I was given a task as an assignment for a company that I applied to. It was a fairly simple concept - create a website that functions as a Center of Mass calculator.

The list of requirements were fairly simple:

- Be able to add items
- Be able to view/delete added items
- State doesn't have to be persisted, i.e. A refresh can clear all items
- Any other functionality e.g. editing is optional

A year since, this project is a recreation of that task with the skills that I have learned since. I will not be uploading my Firebase credentials for obvious reasons, so you will not be able to run my app unless I am working with you. So I have provided a demonstration below.

##[DEMONSTRATION](https://youtu.be/rSoLfdylkZU)

## Instructions

To run the project, navigate to the backend and frontend directories and run these commands:

```
npm run install
npm run dev
```

Note that this will run nodemon instead of node for the backend. This has no effect on the functionality

The backend is required for authentication and to access the database, so ensure this is started. The project can then be viewed [here](http://localhost:5173).

## Frontend

### Build Tool

Typically, create-react-app is used as the primary build tool for frontend. However, I opted to instead use [Vite](https://vitejs.dev/). It is rapidly gaining popularity due to it's blazing fast HMR and _significantly_ faster start time.

This was an interesting experience as I have made several web apps in the past, all using create-react-app. So it took some getting used to as well as some research to figure out how to emulate the same functionality, e.g. Setting up a proxy.

### Component Library

In the past, I have used Ant design and I have also worked a bit with BootstrapUI. However, I opted to learn something new. So I have built my app using [MUI](https://mui.com/).

## Backend

My backend is built using Node.JS as it's runtime environment. It uses Express to handle its routing. It uses the Firestore API to interact with my Firebase collection and for authentication.

My backend consists of an API which allows the user to sign up, login and perform CRUD operations on their array of items.

### API

#### Login/Register

`POST /api/register` - Allows a specified user to be registered.
Request body: `{username: String (valid email), password: String}`
Response body: `{token: String, id: String}`
Status Codes: `200` on success, `400` on error

`POST /api/login` - Allows a specified user to login
Request body: `{username: String, password: String}`
Response body: `{token: String, id: String}`
Status Codes: `200` on success, `400` on error

#### Item

All item objects conform to the following structure: `{_id: String, name: String, mass: Number, x: Number, y: Number, z: Number}`

`GET /api/items/{id}`: Gets all items stored under that users ID
Request body: `{item: object}`
Status Codes: `200` on success, `400` on error

`POST /api/items/{id}`: Adds a new item and generates a uuid for that item
Request body: `{item: object (no _id field) }`
Status Codes: `200` on success, `400` on error

`PUT /api/items/{id}`: Edits an existing item
Request body: `{item: object with _id}`
Status Codes: `200` on success, `404` if \_id field is not found `400` on error

`DELETE /api/items/{id}`: Adds a new item
Request body: `{item: object with _id}`
Status Codes: `200` on success, `404` if \_id is not found`400` on error

## What have I learned?

I will keep this short for simplicity. Overall, I have learned a lot. I learned:

- A new component library
- A new frontend build tool
- How to create a backend API
- How to perform authentication using Firebase
- How to perform CRUD operations on Firebase documents
- More knowledge of React, One very specific thingac is that children components don't update state when the parent state passed as props changes
- Design skills
