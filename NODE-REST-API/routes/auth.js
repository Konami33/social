const router = require("express").Router(); //auth router
const User = require("../models/User"); //importing user schema js file
const bcrypt = require("bcrypt");
//bcrypt for password encryption and decription

//REGISTER an user
router.post("/register", async (req, res) => {  
    try {
        //encryption of password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //create new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });

        //save user to database and return
        const user = await newUser.save();
        res.status(200).json(user); 
    }
    catch(err) {
        res.status(500).json(err);
    }
})

//LOGIN
router.post("/login", async(req, res) => {
    try {
        //varify user email
        const user = await User.findOne({
            email: req.body.email
        });
        //!user && res.status(404).json("user not found");
        if(!user) {
            res.status(404).json("User Not Found");
        } else {
            //varify password
            //first comparing the password with the given one in the req
            const validPassword = await bcrypt.compare(req.body.password, user.password);
           

            if(!validPassword) {
                res.status(400).json("Wrong password and Auth error");
            }else {
                res.status(200).json(user);
            }
        }    
    }
    catch(err) {
        res.status(500).json(err);
    }
})


//to use this we have to export
module.exports = router;