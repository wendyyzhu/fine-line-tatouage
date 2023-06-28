const express = require("express")
const router = express.Router()
const db = require("../db/index.js")


router.get("/", (req, res) => {
    const sql = `SELECT * FROM tattoos 
                ORDER BY likes desc 
                LIMIT 12;`
    db.query(sql, (err, dbRes) => {
        if (err) {
            console.log(err)
        }
        let tattoos = dbRes.rows
        // res.render("home", {tattoos: tattoos})
        const sql1 = `SELECT * FROM tattoos 
        ORDER BY tattoos.id desc 
        LIMIT 12;`
        db.query(sql1, (err, newRes) => {
            if (err) {
                console.log(err)
            }       
            let newTattoos = newRes.rows
            res.render("home", {tattoos: tattoos, newTattoos: newTattoos})
        })
    })
})

module.exports = router