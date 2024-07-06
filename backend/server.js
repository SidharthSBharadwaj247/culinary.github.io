const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");

const dotenv = require("dotenv");
dotenv.config();

const app = express();

connectDB();

app.use(bodyParser.json());

// cors
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE,OPTIONS"
  );

  next();
});

//routes
app.use("/recipe",require("./routes/recipe"));
app.use("/auth",require("./routes/auth"));

app.listen(process.env.PORT,()=>{
    console.log("Server running on port: ",process.env.PORT);
})