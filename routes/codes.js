const express = require('express')
const mongoose = require('mongoose')
const router = express.Router({mergeParams:true})
const Solution = require('../models/solution')
const Code = require('../models/code')

const middleware = require('../middleware')

//get user's code by solution id
router.get("/", middleware.isLoggedIn,
  (req, res) => {
    const solution = Solution.findById(req.params.solution_id)
      .populate("codes")
      .exec((err, solution) => {
        if (err) return console.log(err)
        res.send(solution.codes)
      })
  }
)

//Code Post
router.post("/", middleware.isLoggedIn,
  async (req, res) => {
    const solution = await Solution.findById(req.params.solution_id)
                                  .catch(err => console.log(err))
    const author = { userId: req.user._id, username: req.user.username }
    req.body.author = author
    req.body.problemId = req.params.id
    const code = await Code.create(req.body)
                          .catch(err => console.log(err))
    solution.codes.push(code)
    solution.save()
    res.redirect("/")
  }
)

//Code Update
router.put("/:code_id", middleware.isOwnerOfCode,
  async (req, res) => {
    const author = { userId: req.user._id, username: req.user.username }
    req.body.author = author
    req.body.problemId = req.params.id
    await Code.findByIdAndUpdate(req.params.code_id,
      req.body).catch(err => console.log(err))
    res.redirect("/")
  }
)

//Code Destroy
router.delete("/:code_id", middleware.isOwnerOfCode,
  async (req, res)=> {
    await Code.findByIdAndRemove(req.params.code_id)
              .catch(err => console.log(err))
    const solution = await Solution.findById(req.params.solution_id) 
                                  .catch(err => console.log(err))
    //clean the Code reference in solution.codes
    solution.codes = solution.codes.filter( code => 
      !code.equals(req.params.code_id))
    solution.save()
    res.redirect("/")
  }
)

module.exports = router