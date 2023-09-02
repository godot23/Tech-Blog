const router = require('express').Router();
const {User, Post} = require("../models")

router.get('/', async (req, res) =>{
    try{
        const getPosts = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['userName'],
                },
            ],
        });

        const posts = getPosts.map((post) => post.get({plain: true}));
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        });
    }
    catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;