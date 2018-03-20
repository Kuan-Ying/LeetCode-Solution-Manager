const passport = require('passport')

module.exports = app => {
  //authentication using google outh
  app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  )

  //after google authticates user information then redirect to main page
  app.get('/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/')
    })
  
  //sign out route
  app.get('/api/logout', (req, res) => {
    req.logout()
    res.redirect('/')
  })

  //check current user
  app.get('/api/current_user', (req, res) => {
    res.send(req.user)
  })
}

