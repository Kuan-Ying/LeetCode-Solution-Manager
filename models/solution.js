const mongoose = require('mongoose')

//SCHEMA SETUP
const SolutionSchema = new mongoose.Schema({
    problemId: Number,
    title: String,
    description: String,
    codes: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Code" 
        }
    ],
    author: {
        userId: String,
        username: String
    }
})

module.exports = mongoose.model("Solution", SolutionSchema)