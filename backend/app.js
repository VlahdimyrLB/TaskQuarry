const express = require("express");
const app = new express();
const connectDB = require("./db/connect");
const users = require("./routes/users");
const User = require("./models/users");
require("dotenv").config();

// middleware
app.use(express.static("../frontend"));
app.use(express.json()); // to get req.body

// login
app.post("/api/v1/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    if (user.isAdmin) {
      return res.json({ isAdmin: true });
    }
    return res.json({ isAdmin: false });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
// any requests to paths starting with "/api/v1/tasks" will be handled by the routes "tasks"
app.use("/api/v1/users", users);

const PORT = 5000;
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
