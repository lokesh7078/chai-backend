// require('dot-env').config({path: './env'});

import dotenv from "dotenv";

// import mongoose from "mongoose";
// import {DB_NAME} from "./constants.js";
import connectDB from "./db/index.js";


dotenv.config({
    path: "./env"
})



connectDB()
.then(() => {
    app.listen(process.env.PORT || 8080, () => {
        console.log(`Server is running on port ${process.env.PORT || 8080}`);
    })        
})
.catch((err) => {
  console.log("Mongo db connection error:", err);
})







/*

import express from "express";

( async () => {
    try {
    await mongoose.connect(`{process.env.MONGODB_URI}/${DB_NAME}`,)
    app.on("error", (error) => {

        console.log("ERROR: ", error);
        throw error;
    })

    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    })

    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw err;
    }
})();



*/
