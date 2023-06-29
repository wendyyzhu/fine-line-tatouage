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
        
        const sql1 = `SELECT * FROM tattoos 
                    WHERE category = '${category}' 
                    ORDER BY id desc 
                    LIMIT 12;`
        db.query(sql1, (err, categoryRes) => {
            let similarTattoos = categoryRes.rows
            let tattooId = req.params.id
            let userLikedId = req.session.userId

            const sql2 = `SELECT comments.id, comments.comment, comments.userposted_id, comments.postedon_id, users.username
                        FROM comments JOIN users ON users.id = userposted_id 
                        WHERE comments.postedon_id = $1
                        ORDER BY id asc;`
            db.query(sql2, [req.params.id], (err, commentRes) => {
                let comments = commentRes.rows
                const sql3 = `SELECT * FROM likedposts WHERE tattoo_id = $1 and userliked_id = $2;`
                db.query(sql3, [tattooId, userLikedId], (err, likeRes) => {
                    if (likeRes.rows.length !== 0) {
                        let alreadyLiked = true
                        res.render("show", {tattoo: tattoo, similarTattoos: similarTattoos, alreadyLiked: alreadyLiked, comments: comments})
                    } else {
                        let alreadyLiked = undefined
                        res.render("show", {tattoo: tattoo, similarTattoos: similarTattoos, alreadyLiked: alreadyLiked, comments: comments})
                    }
                })
            })
        })
    })
})

router.get("/:id/edit", ensureLoggedIn, (req, res) => {
    const sql = `SELECT * FROM tattoos WHERE id = $1`
    db.query(sql, [req.params.id], (err, dbRes) => {
        let tattoo = dbRes.rows[0]
        let userId = dbRes.rows[0].user_id
        if (req.session.userId === userId) {
            res.render("edit.ejs", {tattoo: tattoo})
        } else {
            res.redirect("/")
        }
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

router.put("/like/:id", ensureLoggedIn, (req, res) => {
    let tattooId = req.params.id
    let userLikedId = req.session.userId
  
    const sql = `SELECT * FROM likedposts WHERE tattoo_id = $1 and userliked_id = $2;`
  
    db.query(sql, [tattooId, userLikedId], (err, dbRes) => {
      if (dbRes.rows.length === 0) {
        const sql1 = `INSERT into likedposts (tattoo_id, userliked_id) 
        VALUES ($1, $2);`
        db.query(sql1, [tattooId, userLikedId], (err, likedRes) => {
            const sql2 = `UPDATE tattoos SET likes = likes + 1 WHERE id = $1;`
            db.query(sql2, [req.params.id], (err, countRes) => {
            res.redirect(`/tattoos/${req.params.id}`)
            })
          })
        } else {
        res.redirect(`/tattoos/${req.params.id}`)
      }
    })
 })
  
router.delete("/like/:id", ensureLoggedIn, (req, res) => {
    let tattooId = req.params.id 
    let userLikedId = req.session.userId
    const sql = `DELETE FROM likedposts 
                WHERE tattoo_id = $1 and userliked_id = $2;`
db.query(sql, [tattooId, userLikedId], (err, dbRes) => {
      const sql1 = `UPDATE tattoos SET likes = likes - 1 WHERE id = $1;`
      db.query(sql1, [tattooId], (err, likeRes) => {
        res.redirect(`/tattoos/${req.params.id}`)
      })
    })
})

router.post("/comments/:id", ensureLoggedIn, (req, res) => {
    let comment = req.body.comments
    let userCommentedId = req.session.userId
    let tattooId = req.params.id
    const sql = `INSERT INTO comments (comment, userposted_id, postedon_id)
                VALUES ($1, $2, $3);`
    db.query(sql, [comment, userCommentedId, tattooId], (err, dbRes) => {
        if (err) {
            console.log(err)
        } 
        res.redirect(`/tattoos/${tattooId}`)
    })
})

router.delete("/comments/:id", ensureLoggedIn, (req, res) => {
    const sql = `SELECT * FROM comments WHERE id = $1`
    db.query(sql, [req.params.id], (err, dbRes) => {
        let tattooId = dbRes.rows[0].postedon_id
        const sql1 = `DELETE FROM comments WHERE id = $1;`
        db.query(sql1, [req.params.id], (err, deleteRes) => {
            if (err) {
                console.log(err)
            }
            res.redirect(`/tattoos/${tattooId}`)
        })
    })
})

module.exports = router