const mongoose = require('mongoose')

//SCHEMA SETUP
const userSchema =new mongoose.Schema({
  googleId: String,
  username: String,
  email: String
})

module.exports = mongoose.model('users', userSchema)