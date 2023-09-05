const router = require('express').Router();
const withAuth = require('../../utils/auth');

const{ Post } = require("../../models/");

router.delete('/:id', async (req, res) =>{
    try{
        const postData = await Post.destroy({
            where: {
                post_id: req.params.id,
                // user_id: req.session.user_id
            }
        })
        res.status(200).json(postData)
    }
    catch (err){
        res.status(500).json(err);
    }
})

router.post('/', async(req, res) =>{
    try{
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(newPost);
    }
    catch(err){
        res.status(500).json(err);
    }
})

module.exports = router