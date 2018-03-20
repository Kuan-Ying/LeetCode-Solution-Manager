# Introduction
This is a demostration of a MERN stack web application for LeetCode solution management.
Users can sign in with Google account and manage their solutions.
[Live Demo](https://infinite-meadow-25392.herokuapp.com/)

# Featuring
- React
- React-router
- Redux
- React-Bootstrap
- Node.js
- Express
- Passport
- Passport Google OAuth2

# Some Demos

## Post a new solution

<img src="https://i.imgur.com/oKyCTId.gif" width="800">

## Add code to an existing solution

<img src="https://i.imgur.com/CaJvfwD.gif" width="800">

# Getting Started
## Installing packages
Install packages at the root directory and client directory.
```
npm install
```

## Execution
Run server locally:
```
npm run server
```
Run client locally:
```
npm run client
```
Run both server and client:
```
npm run dev
```

## Setting dev.js in config directory
You need to create a dev.js in Config directory when process.env.NODE_ENV !== 'production'.
```
module.exports = {
  mongoURI: "", // your mongoDB URI
  cookieKey: "", // the cookie key you want
  googleClientID: "", // your google client id
  googleClientSecret: ""// your client secret
}
```

## Applying for Google OAuth2 client ID
Since this project uses passport and Google's strategy to login,
you need to setting up an OAuth 2.0 client ID and client Secret.
See the links below:
https://support.google.com/cloud/answer/6158849?hl=en

Then setting up authorized JavaScript origins and redirect URIs. 
<img src="https://i.imgur.com/EBQnpv7.png" width="700">

## About Seeding LeetCode Probems to MongoDB
This project provides sample data of LeetCode problems in /seedDB/seed.js.
To seed the sample data, require /seedDB/seed.js:
```
const seedDB = require('./seedDB/seed.js')
```
and run seedDB after mongoose.connect:
```
seedDB()
```
You can seed your own LeetCode problems into MongoDB by following the schema in /models/leetProblem.js.


# To-do list
 - Automatically update new LeetCode problems on the server side. 
 - Sign in with GitHub account
 - Save solutions and codes in users' GitHub
 - Support image links and pdf links in the solution page.
 - Support searching of titles, tags and contents at the problemset page.
 - Support user-defined tags and searching.
 
