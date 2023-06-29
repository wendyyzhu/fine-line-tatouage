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
      // res.render("profile", {tattoos: tattoos, username: username})
      const sql1 = `SELECT * FROM likedposts 
      JOIN tattoos ON likedposts.tattoo_id = tattoos.id 
      WHERE likedposts.userliked_id = $1 
      ORDER BY likedposts.id desc
      LIMIT 12;`
      db.query(sql1, [userId], (err, likeRes) => {
        let likedTattoos = likeRes.rows
        res.render("profile", {tattoos: tattoos, username: username, likedTattoos: likedTattoos})
        })
    })
})



  
router.get("/:username", ensureLoggedIn, (req, res) => {
    let userId = req.params.username
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