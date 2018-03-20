function spread(problem) {
  let obj = {}
  obj._id = problem._id
  obj.id = problem.id 
  obj.title = problem.title
  obj.difficulty = problem.difficulty
  obj.url = problem.url
  obj.likes = problem.likes
  obj.dislikes = problem.dislikes
  obj.isPremium = problem.isPremium
  obj.acRate = problem.acRate
  obj.tags = problem.tags 
  obj.companies = problem.companies
  return obj
}

module.exports = spread