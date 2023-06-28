require("dotenv").config()

const express = require("express")
const app = express()
const port = process.env.PORT || 3000
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
    secret: process.env.SESSION_SECRET || "keyboard cat",
    resave: false,
    saveUninitialized: true
}))

app.use(setUser)

app.use(expressLayouts)

app.use("/", sessionsRouter)

app.use("/", indexRouter)

app.use("/signup", signupRouter)

app.use("/tattoos", tattoosRouter)


app.get("/user", ensureLoggedIn, (req, res) => {
  let userId = req.session.userId
  const sql = `SELECT * FROM users 
              JOIN tattoos ON users.id = tattoos.user_id 
              WHERE tattoos.user_id = $1
              ORDER BY tattoos.id desc;`
  db.query(sql, [userId], (err, dbRes) => {
    if (err) {
      console.log(err)
    }
    let tattoos = dbRes.rows
    let username = dbRes.rows[0].username
    res.render("profile", {tattoos: tattoos, username: username})
  })
})

app.get("/user/:id", ensureLoggedIn, (req, res) => {
    let userId = req.params.id
    const sql = `SELECT * FROM users 
                JOIN tattoos ON users.id = tattoos.user_id 
                WHERE users.username = $1
                ORDER BY tattoos.id desc;`
    db.query(sql, [userId], (err, dbRes) => {
      if (err) {
        console.log(err)
      }
      let tattoos = dbRes.rows
      let username = dbRes.rows[0].username
      res.render("users", {tattoos: tattoos, username: username})
    })
})


app.get("/category/:id", (req, res) => {
  let category = req.params
  console.log(category)

})


app.listen(port, () => {
    console.log(`listening on port ${port}`)
})