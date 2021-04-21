# Automated Behavior Analysis 

Type: web application
Team: Zoey, Jilian, and Tasha

## Overview
(PLEASE FILL OUT HERE)
## Main Features
- User login/logout
- Load videos
- Add, edit, or remove annotations on video
- View summary statistics of annotations
- Save annotations to Database, as 'training' or 'testing' data
- (PLEASE ADD HERE)

## Design Decisions
- Authentication (third-party service, Google) 
- Mixture of client-side and server-side rendering
- User session: keeps track of session variables, and validates user to access parts of the app.
- File validation: checks extension and size of video upon upload. and keeps track of video's unique identifier for loading previous annotations.
- Choice of DB: MongoDB (NoSQL), for its flexibility and adaptability.
- Collections in DB: Annotations, Users, Videos 
- UI: clean, readable UI. Not elaborate, because it is a scientific application.
- Privacy:

## Connection to Client's API
(PLEASE FILL OUT HERE)

## Technologies Used
- Backend: Express, Node.js, MongoDB, GraphQL
- Frontend: React.js, HTML

## Getting started
To get the Node server running locally:<br/>
<br/>
1. Clone this repo<br/>
2. Navigate to `ui` directory:<br/>
`npm install` to install all required dependencies<br/>
`npm start` to start the local ui server<br/>
<br/>
3. Navigate to `API` directory:<br/>
`npm install` to install dependencies<br/>
`npm start` to start the backend server <br/>