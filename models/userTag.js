const mongoose = require('mongoose')

//SCHEMA SETUP
const userTagSchema =new mongoose.Schema({
  userId: String,
  tagName: String,
  problems: [Number]
})

module.exports = mongoose.model('UserTag', userTagSchema)