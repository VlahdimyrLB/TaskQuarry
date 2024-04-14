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
    const user = await User.create(req.body);
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json(error);
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
