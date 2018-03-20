const express = require('express')
const router = express.Router({mergeParams:true})
const LeetProblem = require('../models/leetproblem')
const middleware = require('../middleware')

//Search for all problems
router.get("/", 
    async (req, res) => {
        let problems = await LeetProblem.find({}).catch(err => console.log(err))
        let data = []
        problems.sort((a,b)=>a.id - b.id)
        for (let problem of problems) {
            let obj = {...problem._doc}
            obj.finished = (!req.user)? false: problem.finished.indexOf(req.user._id) > -1
            data.push(obj)
        }
        res.send(data)
    }
)

//Show problems with certain tag
router.get("/company/:id", 
    async (req, res) => {
        query = {}
        query[req.params.id] = { $exists: true }
        let problems = await LeetProblem.find({tags:req.params.id})
                        .catch(err => console.log(err))
        problems.sort((a, b) => b.companies[req.params.id].frequency - a.companies[req.params.id].frequency)
        let data =[]
        for (let problem of problems) {
            let obj = {...problem._doc}
            obj.finished = (!req.user)? false: problem.finished.indexOf(req.user._id) > -1
            data.push(obj)
        }
        res.send(data)
    }
)

//Show problems with certain tag
router.get("/search", 
    async (req, res) => {
        let problems = LeetProblem.find(req.query).catch(err => console.log(err))
        let data = []
        probelms.sort((a,b)=>a.id - b.id)
        for (let problem of probelms) {
            let obj = {...problem._doc}
            obj.finished = problem.finished.includes(req.user._id)
            data.push(obj)
        }
        res.send(data)
    }
)

//Update finsih array of the problem (add or remove currentUser)
router.put("/finish/:id", middleware.isLoggedIn,
    async (req, res) => {
        let problem = await LeetProblem.findById(req.params.id).catch(err => console.log(err))
        if (!problem) res.redirect("/")
        if (problem.finished.indexOf(req.user._id) > -1) {
            problem.finished = problem.finished.filter((userId)=> userId === req.user._id)
        } else {
            problem.finished.push(req.user._id)
        }
        problem.save()
        res.redirect("/")
    } 
)

module.exports = router