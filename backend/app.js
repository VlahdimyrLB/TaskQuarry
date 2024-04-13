const express = require("express");
const app = new express();
const connectDB = require("./db/connect");
const users = require("./routes/users");
require("dotenv").config();

// middleware
// app.use(express.static("./public"));
app.use(express.json()); // to get req.body

// any requests to paths starting with "/api/v1/tasks" will be handled by the routes "tasks"
app.use("/api/v1/users", users);

const PORT = 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server is listening to port ${PORT}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
