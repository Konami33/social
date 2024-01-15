//we require express, mongoose, dotenv, helmet, morgan and application
const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const port = process.env.PORT || 5000;
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
const cors = require('cors');
//file and image handling
const path = require("path");
const multer = require("multer");



//to use dotenv
dotenv.config();

//mongodb connection with mongoose
mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("connected to Mongodb");
})
.catch((error) => {
    // Handle any connection errors
    console.error('Error connecting to the database:', error);
});

//ei path ta k browser e dekhanor jonno
app.use("/images", express.static(path.join(__dirname, "public/images")));


//middlewires
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors());


//lets create our application router

// app.get("/", (req, res) => {
//     res.send("Welcome to our home page server");
// })

//handle file and image upload

//kothay store hobe sheitar definition
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images");
    },
    filename: function (req, file, cb) {
        cb(null, req.body.name);
    }
})

const upload = multer({storage: storage});
app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
        return res.status(200).json("File uploaded successfully");
    }catch(err) {
        console.log(err);
    }
})

//routers
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute );
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);


//how can we listen this application
//port will be 8800
app.listen(port, ()=> {
    console.log(`Server is running at : ${port}`);
})