import express from "express"; //ES module
import dotenv from "dotenv";
import path from "path";
import cors from "cors";

import productRoutes from "./routes/product.routes.js";
import { connectDB } from "../config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

//middleware. should be before routes.
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      //by default it allows every requests from every single URLs
      origin: "http://localhost:5173", //but by adding origin it only allows the requests form this set of array or a single string.
    }),
  );
}

//MIDDLEWARE
app.use(express.json()); // a middleware which allows us to parse the req.body below. allows us to accept JSON data in the body. (the req.body)

//for the app to use the routes ( preset("/api/notes") + the ones in notesRoutes).
app.use("/api/products", productRoutes);

//this if statement is, run the {.....} command if we are in the production state in render.com
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../Frontend/dist"))); //basically means, serve our optimized react app (with dist) as a static assets.

  // Express 5 specific "catch-all" syntax
  app.get("/{*splat}", (req, res) => {
    res.sendFile(path.join(__dirname, "../Frontend", "dist", "index.html"));
  });
}

connectDB().then(() => {
  //first connect the DB then run the app.
  app.listen(PORT, () => {
    console.log("Server started on PORT", PORT);
  });
});
