const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
//importing post model

//create a post and save to mongodb
router.post("/", async(req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch(err) {
        res.status(500).json(err);
    }
});
//udpate a post
router.put("/:id", async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        //check if the user wanted to udpate the post is the same post that the user created
        if(post.userId === req.body.userId) {
            await post.updateOne({
                $set: req.body
            })
            res.status(200).json("Post has been updated");
        }
        else {
            res.status(403).json("you can only update your post");
        }
    }
    catch(err) {
        res.status(500).json(err);
    }
});
//delete a post
router.delete("/:id", async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        //check if the user wanted to delete the post is the same post that the user created
        if(post.userId === req.body.userId) {
            await post.deleteOne();
            res.status(200).json("Post has been deleted");
        }
        else {
            res.status(403).json("you can only delete your post");
        }
    }
    catch(err) {
        res.status(500).json(err);
    }
});
//like and dislike a post
router.put("/:id/like", async(req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        //like
        if(!post.likes.includes(req.body.userId)) {
            await post.updateOne({
                $push: {
                    likes: req.body.userId
                }
            });
            res.status(200).json("This post has been liked");
        } //dislike 
        else {
            await post.updateOne({
                $pull: {
                    likes: req.body.userId
                }
            })
            res.status(200).json("Disliked the post")
        }
    }catch(err) {
        res.status(500).json(err);
    }
})
//get a post
router.get("/:id", async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    }catch(err) {
        res.status(500).json(err);
    }
})
//get timeline posts of users and following users
router.get("/timeline/:userId", async(req, res) => {
    try {
        //find the posts of current user
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({
            userId : currentUser._id
        });

        //find the posts of its followings
        const friendPosts = await Promise.all(
            currentUser.following.map(friendId => {
                return Post.find({userId:friendId});
           })
        );
        res.status(200).json(userPosts.concat(...friendPosts));

    } catch (err) {
        res.status(500).json(err);
    }
})
//get user's all post
router.get("/profile/:username", async(req, res) => {
    const user = await User.findOne({username: req.params.username});
    try {
        const posts =  await Post.find(
            {userId: user._id}
        );
        res.status(200).json(posts);
    } catch(err) {
        res.status(500).json(err);
    }
})

module.exports = router;