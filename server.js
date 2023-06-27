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


app.get("/tattoos/:id", (req, res) => {
    const sql = `SELECT * FROM tattoos WHERE id = $1;`

    db.query(sql, [req.params.id], (err, dbRes) => {
        if (err) {
            console.log(err)
        }
        let tattoo = dbRes.rows[0]
        res.render("show", {tattoo: tattoo})
    })
})

app.get("/tattoos", (req, res) => {
    res.render("new")
})

app.post("/tattoos", (req, res) => {
    let title = req.body.title
    let imageUrl = req.body.image_url
    let category = req.body.category
    let artist = req.body.tattoo_artist
    const sql = `INSERT INTO tattoos (title, image_url, category, tattoo_artist, user_id) 
                VALUES ($1, $2, $3, $4, $5)
                RETURNING id;
                `
    db.query(sql, [title, imageUrl, category, artist, req.session.userId], (err, dbRes) => {
        if (err) {
            console.log(err)
        }
        res.redirect(`/tattoos/${dbRes.rows[0].id}`)
    })
})

app.delete("/tattoos/:id", (req, res) => {
    const sql = `DELETE FROM tattoos WHERE id = $1`
    db.query(sql, [req.params.id], (err, dbRes) => {
        if (err) {
            console.log(err)
        }
        res.redirect("/")
    })
})

app.get("/tattoos/:id/edit", (req, res) => {
    const sql = `SELECT * FROM tattoos WHERE id = $1`
    db.query(sql, [req.params.id], (err, dbRes) => {
        let tattoo = dbRes.rows[0]
        res.render("edit", {tattoo: tattoo})
    })
})

app.put("/tattoos/:id", (req, res) => {
    let title = req.body.title
    let imageUrl = req.body.image_url
    let category = req.body.category
    let artist = req.body.tattoo_artist
    let id = req.params.id

    const sql = `UPDATE tattoos 
        SET title = $1, 
        category = $2, 
        tattoo_artist = $3, 
        image_url = $4 
        WHERE id = $5;`
    db.query(sql, [title, category, artist, imageUrl, id], (err, dbRes) => {
        res.redirect(`/tattoos/${req.params.id}`)
    })
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})