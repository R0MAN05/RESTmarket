import express from 'express';   //ES module
import dotenv from "dotenv"

import productRoutes from "./routes/product.routes.js";
import { connectDB } from "../config/db.js";


dotenv.config();


const app = express(); 
const PORT = process.env.PORT || 5000;

//MIDDLEWARE
app.use(express.json());   // a middleware which allows us to parse the req.body below. allows us to accept JSON data in the body. (the req.body)


//for the app to use the routes ( preset("/api/notes") + the ones in notesRoutes).
app.use("/api/products", productRoutes);


connectDB().then( () => {    //first connect the DB then run the app.
  app.listen(PORT, () => {
    console.log("Server started on PORT", PORT);
  });
})

