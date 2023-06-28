const express = require("express")
const router = express.Router()
const db = require("../db/index.js")
const ensureLoggedIn = require("../middlewares/ensure_logged_in.js")

router.get("/", ensureLoggedIn, (req, res) => {
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
  
router.get("/:id", ensureLoggedIn, (req, res) => {
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

module.exports = router