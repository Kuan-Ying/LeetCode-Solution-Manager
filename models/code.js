const mongoose = require('mongoose')

//SCHEMA SETUP
const CodeSchema = new mongoose.Schema({
    problemId:Number,
    type: String,
    content: String,
    author: {
        userId: String,
        username: String
    }
})

module.exports = mongoose.model("Code", CodeSchema)