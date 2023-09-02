const router = require('express').Router();
// const withAuth = require('../../utils/auth');

const{ User } = require("../../models/");

router.post("/", async (req, res) => {
    try{
        const userData = await User.create(req.body);

        req.session.save(() =>{
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            req.status(200).json(userData)
        });
    }
    catch (err){
        req.status(500).json(err);
    }
})

module.exports = router;