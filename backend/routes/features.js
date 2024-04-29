const express = require("express");
const router = express.Router();
const {
  getAllFeatures,
  getSingleFeature,
  createFeature,
  updateFeature,
  deleteFeature,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/features");

const { getAllFeaturesOfProject } = require("../controllers/features");

// Route to get all features of a specific project
router.get("/project/:projectId", getAllFeaturesOfProject);

// Routes for other feature-related operations
router.route("/").get(getAllFeatures);
router.route("/:projectId").post(createFeature); // create features
router
  .route("/:id")
  .get(getSingleFeature)
  .patch(updateFeature)
  .delete(deleteFeature)
  .post(createTask);
router.route("/:featureId/tasks/:taskId").patch(updateTask).delete(deleteTask);

module.exports = router;
