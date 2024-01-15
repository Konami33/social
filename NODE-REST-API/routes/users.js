//importing the router
const router = require("express").Router();
//importing the schema
const User = require("../models/User");
const bcrypt = require("bcrypt");


//update user
router.put("/:id", async (req, res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin) {
        //first handle password
        if(req.body.password) {
            try {
                //encyption of password
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            }
            catch(err) {
                return res.status(500).json(err);
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            });
            res.status(200).json("Account has been updated"); 
        }
        catch(err) {
            res.status(500).json(err);
        }


    }
    else {
        return res.status(403).json("You can only update your account");
    }
})
//delete user
router.delete("/:id", async (req, res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            const user = await User.findOneAndDelete(req.params.id);
            res.status(200).json("Account has been deleted"); 
        }
        catch(err) {
            res.status(500).json(err);
        }
    }
    else {
        return res.status(403).json("You can only delete your account");
    }
})
//get a user
router.get("/", async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try {
        const user = userId
        ? await User.findById(userId)
        : await User.findOne({username: username})
        //hide unnecessary and secret data
        const {password, createdAt, ...other} = user._doc; // secret and unnecessary gula user._doc e chole jabe r baki gula other e thakbe. then send other to show
        res.status(200).json(other);
    }
    catch(err) {
        res.status(500).json(err);
    }
})
//get friends
router.get("/friends/:userId", async(req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const friends = await Promise.all(
            user.following.map(friendId => {
                return User.findById(friendId);
            })
        );
        let friendList = [];
        friends.map(friend => {
            const { _id, username, profilePicture} = friend;
            friendList.push({_id, username, profilePicture});
        });
        res.status(200).json(friendList);
    } catch (err) {
        console.log(err);
    }
})

//follow a user
router.put("/:id/follow", async (req, res) => {

    //check if the reqested currentUser wants to follow himself
    if(req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            //check if current user allready follow the user
            if(!user.followers.includes(req.body.userId)) {
                //update the follower array of user and following array of currenUser
                await user.updateOne({
                    $push: {
                        followers: req.body.userId
                    }
                });
                await currentUser.updateOne({
                    $push: {
                        following:req.params.id
                    }
                });
                res.status(200).json("User has been followed")
            }

        }
        catch(err) {
            res.status(500).json(err);
        }
    }
    else {
        return res.status(403).json("You cant follow yourselft");
    }
}) 
//unfollow a user
router.put("/:id/unfollow", async (req, res) => {

    //check if the reqested currentUser wants to follow himself
    if(req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            //check if current user allready follow the user
            if(user.followers.includes(req.body.userId)) {
                //update the follower array of user and following array of currenUser
                await user.updateOne({
                    $pull: {
                        followers: req.body.userId
                    }
                });
                await currentUser.updateOne({
                    $pull: {
                        following:req.params.id
                    }
                });
                res.status(200).json("User has been unfollowed")
            }
        }
        catch(err) {
            res.status(500).json(err);
        }
    }
    else {
        return res.status(403).json("You cant unfollow yourselft");
    }
}) 
//to use this we have to export
module.exports = router;