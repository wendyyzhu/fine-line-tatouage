const express = require("express")
const router = express.Router()
const db = require("../db/index.js")


router.get("/", (req, res) => {
    db.query("SELECT * FROM tattoos;", (err, dbRes) => {
        if (err) {
            console.log(err)
        }
        let tattoos = dbRes.rows
        res.render("home", {tattoos: tattoos})
    })
})

module.exports = router