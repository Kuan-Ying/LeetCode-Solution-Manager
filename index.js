const express = require('express')
const mongoose = require('mongoose')
const keys = require('./config/keys')
const passport = require('passport')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')

const problemRoutes = require('./routes/problems')
const solutionRoutes = require('./routes/solutions')
const codeRoutes = require('./routes/codes')
const userTagRoutes = require('./routes/userTags')


require('./services/passport')

const app = express()

mongoose.connect(keys.mongoURI, (err, db) =>{
    if (err){
        console.log("unable to connect db")
    } else {
        console.log("db connected")
    }
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use(methodOverride("_method"))
app.use( 
    cookieSession({
      maxAge: 30 * 24 * 60 * 60 * 1000,
      keys:[keys.cookieKey]
    })
  )

app.use(passport.initialize())
app.use(passport.session())
    
require('./routes/authRoutes')(app)

app.use("/api/problems", problemRoutes)
app.use("/api/solutions", solutionRoutes)
app.use("/api/solutions/:solution_id/codes", codeRoutes)
app.use("/api/tags",userTagRoutes)
app.get("/login", (req, res)=> res.redirect("/auth/google"))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(__dirname + '/client/build'))
    const path = require('path')
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname,'client', 'build', 'index.html'))
    })
} 

const PORT = process.env.PORT || 5000

app.listen(PORT, process.env.IP, 
    () => console.log("LeetApp has started"))