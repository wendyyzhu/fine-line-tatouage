require("dotenv").config()

const express = require("express")
const app = express()
const port = 3000
const expressLayouts = require("express-ejs-layouts")
const methodOverride = require("method-override")
const session = require("express-session")
const bcrypt = require("bcrypt")
const db = require('./db/index.js')

const sessionsRouter = require("./routes/sessions.js")
const indexRouter = require("./routes/index.js")
const tattoosRouter = require("./routes/tattoos.js")
const signupRouter = require("./routes/signup.js")

const setUser = require("./middlewares/set_user.js")
const ensureLoggedIn = require("./middlewares/ensure_logged_in.js")

app.set("view engine", "ejs")

app.use(express.static("public"))
app.use(express.static(__dirname + "/public"))

app.use(express.urlencoded({ extended: true }))

app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method
      delete req.body._method
      return method
    }
  }))

app.use(session({
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 3},
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

app.use(setUser)

app.use(expressLayouts)

app.use("/", sessionsRouter)

app.use("/", indexRouter)

app.use("/signup", signupRouter)

app.use("/tattoos", tattoosRouter)

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})