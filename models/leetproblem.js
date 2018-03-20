const mongoose = require('mongoose')

//SCHEMA SETUP
const leetProblemSchema = new mongoose.Schema({
    id: Number,
    title: String,
    difficulty: String,
    url: String,
    likes: Number,
    dislikes: Number,
    isPremium: Boolean,
    acRate: Number,
    tags: [{type:String}],
    finished: [String],
    companies: {type: mongoose.Schema.Types.Mixed, default:{}},
})

module.exports = mongoose.model("LeetProblem", leetProblemSchema)