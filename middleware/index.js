const Solution = require('../models/solution')
const Code = require('../models/code')

let middlewareObj = {}

middlewareObj.isLoggedIn = function (req, res ,next) {
  if (!req.user) {
    return res.redirect("/login")
  } else {
    return next()
  }
}

middlewareObj.isOwnerOfSolution = function(req, res ,next) {
  if (!req.user) {
    return res.redirect("/login")
  }
  Solution.findById(req.params.solution_id, (err, solution) => {
    if (err) {
      return res.redirect("back")
    }
    return req.user._id.equals(solution.author.userId)?
        next():res.redirect("back")
  })
}


middlewareObj.isOwnerOfCode = function(req, res, next) {
  if (!req.user) {
    return res.redirect("/login")
  }
  Code.findById(req.params.code_id, (err, code) => {
    if (err) {
      return res.redirect("back")
    }
    return req.user._id.equals(code.author.userId)?
                          next():res.redirect("back")
  })
}

module.exports = middlewareObj