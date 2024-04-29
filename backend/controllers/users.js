const User = require("../models/users");

const getAllUsers = async (req, res) => {
  try {
    const user = await User.find({});
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getSingleUser = async (req, res) => {
  try {
    const { id: userID } = req.params;
    const user = await User.findById({ _id: userID });
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json(error);
  }
};

const createUser = async (req, res) => {
  try {
    const { name, username, password, isAdmin } = req.body;

    // Extract buffer of uploaded image
    const { buffer } = req.file;

    // Convert image buffer to base64 encoded string
    const base64Image = buffer.toString("base64");

    // Create new user object with image data
    const user = new User({
      name,
      username,
      password,
      isAdmin,
      image: {
        data: base64Image,
        contentType: req.file.mimetype,
      },
    });

    // Save user to database
    await user.save();
    res.status(201).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id: userID } = req.params;
    const data = req.body;
    const user = await User.findOneAndUpdate({ _id: userID }, data, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).json({ msg: `No user with id: ${userID}` });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id: userID } = req.params;
    const user = await User.findOneAndDelete({ _id: userID });
    if (!user) {
      return res.status(404).json({ msg: `No user id: ${userID}` });
    }
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
};
