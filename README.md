# Automated Behavior Analysis 

Type: web application
Team: Zoey, Jilian, and Tasha

## Overview
A fullstack web interface that utilizes machine learning to estimate mice behavior with user-defined time intervals. This application can be used if you need:
- a tool for annotating videos with user-specified animal behaviors
- an interface for initializing, training and testing behavior estimation models
- a practical method for connecting machine learning models and making predictions on new data

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

## Technologies Used
- Backend: Express, Node.js, MongoDB, GraphQL
- Frontend: React.js, HTML/CSS


## Main Features
- User login/logout
- Load videos
- Add, edit, or remove annotations on video
- View summary statistics of annotations
- Save annotations to Database, as 'training' or 'testing' data
- Collect user feedback

## Design Decisions
- Authentication (third-party service, Google) for security
- Mixture of client-side and server-side rendering for efficiency
- User session: keeps track of session variables, and validates user to access parts of the app.
- File validation: checks extension and size of video upon upload. and keeps track of video's unique identifier for loading previous annotations.
- Choice of DB: MongoDB (NoSQL), for its flexibility and adaptability.
- Collections in DB: Annotations, Users, Videos. 
- UI: clean, readable UI. Not too elaborate or fancy, because it is a scientific application.
- Privacy: information collected (access tokens, Google account information, user-defined behavior tags and their corresponding time intervals) is only used in the app and not shared with third parties outside of those used to host the website and database.

## Connection to Client's API
Client will develop a backend Python API that takes inputs from our web application, performs machine learning on training data, then is able to take testing inputs from our web application to make predictions on the behavior of animals on the user-uploaded videos. When prediction outputs of the Python API is sent back to our backend, we retrieve these results and write to a downloadable CSV file that the users can then download on the 'results' page. 

## Future work:
Since our final project is a part of our client's funded PhD project that lasts for at least a year, they are still working on developing the Python API and currently this web application is not connected with a behavior estimation model. Once they finish implementing the machine learning model, we plan to connect with it and do further testings. Right now our client is satisfied with this fullstack interface.
