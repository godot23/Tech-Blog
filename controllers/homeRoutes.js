const router = require('express').Router();
const { User, Post } = require("../models")
const withAuth = require("../utis/auth");

router.get('/', async (req, res) => {
    try {
        const getPosts = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['userName'],
                },
            ],
        });

        const posts = getPosts.map((post) => post.get({ plain: true }));
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
});

router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [{
                model: User,
                attributes: ['user_name'],
            },
            ],
        })
        res.render('dashboard', {
            ...posts,
            logged_in: true
        });
    }
    catch (err) {
        res.status(500).json(err)
    }
})

router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/profile');
      return;
    }
  
    res.render('login');
  });

module.exports = router;