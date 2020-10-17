import mongoose = require("mongoose");
import fs = require("fs");

export async function createDatabase() {
    const rootUser = "root";
    const rootPass = fs.readFileSync("mongo_password.txt", "utf-8");
    
    const mongodb = "mongodb://127.0.0.1/tippspiel-db";
    const options = {
      user: rootUser,
      pass: rootPass,
      authSource: "admin",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    
    await mongoose.connect(mongodb, options);
    
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "MongoDB connection error:"));    
}
