const express = require('express');
const router = express.Router();
const Movie = require("../models/Movies");

router.post('/movieData', async (req, res) => {
    let data = req.body.movie_data
    let eId = await Movie.findOne({ 'email': req.body.email })
    if (!eId) {
        try {
            await Movie.create({
                email: req.body.email,
                movie_data: [data]
            }).then(() => {
                res.json({ success: true })
            })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)
        }
    }

    else {
        try {
            let existing = await Movie.exists({ email: req.body.email, movie_data: data });
            if (!existing) {
                console.log("adding");
                await Movie.findOneAndUpdate({ email: req.body.email },
                    { $push: { movie_data: data } }).then(() => {
                        res.json({ success: true })
                    })
            }
            else res.json({ "msg": "already added" });
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)
        }
    }
})

router.post('/myMovieData', async (req, res) => {
    try {
        let eId = await Movie.findOne({ 'email': req.body.email })
        res.json({ movieData: eId })
    } catch (error) {
        res.send("Error", error.message)
    }
});

router.post('/deleteMovieData', async (req, res) => {
    try {
        let data = req.body.movie_data;
        await Movie.updateOne({ 'email': req.body.email} ,{
            $pull: { movie_data: data }
    });
        res.json({success:true});
    } catch (error) {
        res.send("Error", error.message)
    }
});

module.exports = router;