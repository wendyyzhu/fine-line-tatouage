const express = require("express")
const router = express.Router()
const db = require("../db/index.js")
const ensureLoggedIn = require("../middlewares/ensure_logged_in.js")

router.get("/:category", ensureLoggedIn, (req, res) => {
    let category = req.params.category
    const sql = `SELECT * FROM tattoos 
                WHERE category = $1
                ORDER BY tattoos.id desc;`
    db.query(sql, [category], (err,dbRes) => {
      if (err) {
  
        console.log(err)
      }
      let tattoos = dbRes.rows
      if (tattoos.length === 0) {
        res.redirect("/")
        return
      }
      let categoryName = dbRes.rows[0].category
      res.render("category", {tattoos: tattoos, categoryName: categoryName})
    })
})


module.exports = router