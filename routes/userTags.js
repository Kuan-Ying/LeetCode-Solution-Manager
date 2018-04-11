const express = require('express')
const router = express.Router({mergeParams:true})
const LeetProblem = require('../models/leetproblem')
const User = require('../models/user')
const UserTag = require('../models/userTag')
const middleware = require('../middleware')

router.get("/", middleware.isLoggedIn, 
    (req, res) =>{
      User.findById(req.user._id)
          .populate("userTags")
          .exec((err, data) => {
            if (err) return console.log(err)
            res.send(data.userTags)
          })
    })

//post a new userTag
router.post("/", middleware.isLoggedIn,
  async (req, res) => {

  })

module.exports = router