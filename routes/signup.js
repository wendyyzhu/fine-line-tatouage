const express = require("express")
const router = express.Router()
const db = require("../db")
const bcrypt = require("bcrypt")

router.get("/", (req, res) => {
    res.render("signup")
})

router.post("/", (req, res) => {
    let email = req.body.email
    let username = req.body.username
    let plainTextPassword = req.body.password
    let saltRounds = 10

    bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) {
            console.log(err)
        }
        bcrypt.hash(plainTextPassword, salt, (err, hash) => {
          let sql = `INSERT INTO users (email, username, password_digest) 
          VALUES ('${email}', '${username}', '${hash}');
          `
            db.query(sql, (err, signupRes) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log('new user created')
                }
            })
        })
    })
    res.redirect("/login")
})

module.exports = router