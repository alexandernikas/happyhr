const express = require("express");
const mongoose = require("mongoose");
const Router = require("./routes")
const cors = require("cors");
const app = express();

app.use(express.json());

var corsOptions = {
    origin: "http://localhost:8080"
  };
  
app.use(cors(corsOptions));

//const connectToMongo = async () => {
    try {
        mongoose.connect("mongodb://localhost:27017/DEV",{useNewUrlParser: true,  useUnifiedTopology: true });
        console.log("Connected to Mongo Successfully!");
      } catch (error) {
        console.log(error);
      }
    //};

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});

// ...
app.use("",Router);

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});