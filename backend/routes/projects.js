const express = require("express");
const router = express.Router();

const {
  getAllProjects,
  getSingleProject,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/projects");

router.route("/").get(getAllProjects).post(createProject);
router
  .route("/:id")
  .get(getSingleProject)
  .patch(updateProject)
  .delete(deleteProject);

module.exports = router;
