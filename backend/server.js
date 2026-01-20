import express from 'express';   //ES module
import dotenv from "dotenv"
import { connectDB } from "./config/db.js"


dotenv.config();


const app = express(); 


//MIDDLEWARE
app.use(express.json());   // a middleware which allows us to parse the req.body below. allows us to accept JSON data in the body. (the req.body)



app.listen(5000, () => {
    connectDB();
    console.log("Server started at http://localhost:5000 ")
})
