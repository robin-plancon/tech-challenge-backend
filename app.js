const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const personsRoutes = require("./routes/persons-routes");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

app.use("/api/persons", personsRoutes);

app.use((req, res, next) => {
  throw new Error("Could not find this route.");
});

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.tyih6.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
);
let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

app.listen(5000);
console.log("Listening on port 5000");

module.exports = app;
