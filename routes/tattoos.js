const express = require("express")
const router = express.Router()
const db = require("../db/index.js")
const ensureLoggedIn = require("../middlewares/ensure_logged_in.js")

router.get("/", ensureLoggedIn, (req, res) => {
    res.render("new")
})

router.post("/", ensureLoggedIn, (req, res) => {
    let title = req.body.title
    let imageUrl = req.body.image_url
    let category = req.body.category
    let artist = req.body.artist
    let datePosted = new Date().toLocaleDateString();

    const sql = `INSERT INTO tattoos (title, image_url, category, artist, user_id, date_posted, likes) 
                VALUES ($1, $2, $3, $4, $5, $6, $7)
                RETURNING id;
                `
    db.query(sql, [title, imageUrl, category, artist, req.session.userId, datePosted, 0], (err, dbRes) => {
        if (err) {
            console.log(err)
        }
        res.redirect(`/tattoos/${dbRes.rows[0].id}`)
    })
})


router.get("/:id", ensureLoggedIn, (req, res) => {
    const sql = `SELECT * FROM users 
                JOIN tattoos ON users.id = tattoos.user_id 
                WHERE tattoos.id = $1;`

    db.query(sql, [req.params.id], (err, dbRes) => {
        if (err) {
            console.log(err)
        }
        let tattoo = dbRes.rows[0]
        let category = dbRes.rows[0].category 
        let sql1 = `SELECT * FROM tattoos WHERE category = '${category}';`
        db.query(sql1, (err, categoryRes) => {
            let similarTattoos = categoryRes.rows
            res.render("show", {tattoo: tattoo, similarTattoos: similarTattoos})
        })
    })
})

router.delete("/:id", ensureLoggedIn, (req,res) => {
    const sql = `SELECT * FROM tattoos WHERE id = $1;`
    db.query(sql, [req.params.id], (err, dbRes) => {
        let userId = dbRes.rows[0].user_id
        if (req.session.userId === userId) {
            const sql1 = `DELETE FROM tattoos WHERE id = $1;`
            db.query(sql1, [req.params.id], (err, deleteRes) => {
                if (err) {
                    console.log(err)
                }
                res.redirect("/")
            })
        } else {
            res.redirect("/")
        }
    })
})

router.get("/:id/edit", ensureLoggedIn, (req, res) => {
    const sql = `SELECT * FROM tattoos WHERE id = $1`
    db.query(sql, [req.params.id], (err, dbRes) => {
        let tattoo = dbRes.rows[0]
        let userId = dbRes.rows[0].user_id
        if (req.session.userId === userId) {
            res.render("edit", {tattoo: tattoo})
        } else {
            res.redirect("/")
        }
    })
})

router.put("/:id", ensureLoggedIn, (req, res) => {
    let title = req.body.title
    let imageUrl = req.body.image_url
    let category = req.body.category
    let artist = req.body.artist
    let id = req.params.id
    
    const sql = `UPDATE tattoos 
        SET title = $1, 
        category = $2, 
        artist = $3, 
        image_url = $4 
        WHERE id = $5;`
    db.query(sql, [title, category, artist, imageUrl, id], (err, dbRes) => {
        res.redirect(`/tattoos/${req.params.id}`)
    })
})

module.exports = router