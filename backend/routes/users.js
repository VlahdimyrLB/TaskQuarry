const express = require("express");
const router = express.Router();
const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
});

const {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");

router.route("/").get(getAllUsers);
router.post("/", upload.single("image"), createUser);
router.route("/:id").get(getSingleUser).patch(updateUser).delete(deleteUser);

module.exports = router;
