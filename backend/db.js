const mongoose  = require("mongoose");
const url = process.env.DATABASEURL;

const connectDB = async () => {
  try {
    await mongoose.connect(url);
    // console.log(url)
    console.log("Database is connected");
    
  } catch (error) {
    console.log("DB connection failed Error:", error.message);
    console.error("Full error:", error);
  }
};
module.exports = connectDB;
