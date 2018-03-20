const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const keys = require('../config/keys.js')

const User = require('../models/user')

passport.serializeUser((user,done)=> done(null,user.id))

passport.deserializeUser((id, done) => 
  User.findById(id)
    .then(user => done(null, user))
    .catch(err => console.log(err))
)

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    }, 
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({googleId: profile.id})
                                .catch(err => console.log(err))
      if (existingUser) {
          return done(null, existingUser)
      } 
      
      const newCreatedUser = await User.create({googleId: profile.id, 
                                                username:profile.displayName, 
                                                email:profile.emails[0].value})
                                      .catch(err=> console.log(err))        
      done(null, newCreatedUser) 
    }
  )
)