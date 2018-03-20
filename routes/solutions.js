const express = require('express')
const mongoose = require('mongoose')
const router = express.Router({mergeParams:true})
const Solution = require('../models/solution')
const Code = require('../models/code')
const middleware = require('../middleware')

//get user's solutions of probelm id
router.get("/:id",
    (req, res) => {
      Solution.find({
        problemId:req.params.id, 
        author: {
          userId: req.user._id.toString(), //req.user._id is an object instead of a plain string
          username: req.user.username
        }
      }).populate("codes")
        .exec((err, solutions) => {
          if (err) return console.log(err)
          res.send(solutions)
      })
    }
)

//post a new solution
router.post("/:id", middleware.isLoggedIn,
  async (req, res) => {
    const author = { userId: req.user._id, username: req.user.username }
    req.body.code.author = author
    req.body.code.problemId = req.params.id
    const code = await Code.create(req.body.code)
      .catch(err => console.log(err))
    let newSolution = {
      title: req.body.title,
      author: author,
      codes: [code],
      description: req.body.description,
      problemId: req.params.id
    }
    await Solution.create(newSolution)
      .catch(err => console.log(err))
    res.redirect("/")
  }
)

//update the description of existing solution
router.put("/:solution_id/description", middleware.isLoggedIn,
  async (req, res) => {
    let solution = await Solution.findById(req.params.solution_id)
                                  .catch(err => console.log(err))
    solution.description = req.body.description
    solution.save()
    res.redirect("/")
  }  
)

//update the title of existing solution
router.put("/:solution_id/title", middleware.isOwnerOfSolution,
  async (req, res) => {
    let solution = await Solution.findById(req.params.solution_id)
                                  .catch(err => console.log(err))
    solution.title = req.body.title
    solution.save()
    res.redirect("/")
  }  
)

//delete solution
router.delete("/:solution_id", middleware.isOwnerOfSolution,
  async (req, res) => {
    const solution = await Solution.findById(req.params.solution_id)
                  .catch(err => console.log(err))
    //clean all the codes in the solution
    for (let codeId of solution.codes) {
      await Code.findByIdAndRemove(codeId).catch(err => console.log(err))
    }  
    await Solution.findByIdAndRemove(req.params.solution_id)
    res.redirect("/")
  }
)

module.exports = router