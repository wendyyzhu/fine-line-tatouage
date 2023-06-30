const express = require("express")
const router = express.Router()
const db = require("../db/index.js")
const ensureLoggedIn = require("../middlewares/ensure_logged_in.js")

router.get("/:id", ensureLoggedIn, (req, res) => {
    const sql = `SELECT * FROM tattoos 
                WHERE artist = $1
                ORDER BY tattoos.id desc;`
    db.query(sql, [req.params.id], (err, dbRes) => {
      if (err) {
        console.log(err)
      }
      let tattoos = dbRes.rows
      let artist = dbRes.rows[0].artist
      res.render("artist", {tattoos: tattoos, artist: artist})
    })
})

module.exports = router 