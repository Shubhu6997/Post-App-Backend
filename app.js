require("dotenv").config();
const express = require("express");
const app  = express();
const cors = require("cors");
const mongo = require("./Shared/mongo");

(async()=>{

    try {
        //MongoDB connectivity
        await mongo.connect();
        
        //Middleware to allow access to APIs
        app.use(cors());

        //Routes
        const postRoute = require("./routes/posts.routes");

        //Middleware to parse request body into JSON format
        app.use(express.json());

        app.use("/posts", postRoute);
        

        //Server Start
        app.listen(process.env.PORT, ()=>console.log(`Server started at ${process.env.PORT}`));
        
    } catch (error) {
        console.log("Error while starting server : ", error)
    }
})();