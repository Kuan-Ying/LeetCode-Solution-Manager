const mongoose = require('mongoose')

//SCHEMA SETUP
const userSchema =new mongoose.Schema({
  googleId: String,
  username: String,
  email: String,
  userTags:[
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "UserTag" 
        }
    ]
})

module.exports = mongoose.model('users', userSchema)