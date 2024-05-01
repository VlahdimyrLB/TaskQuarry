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
  getAllFeaturesOfProject,
  getFeaturesByAssignedUser, // Import the new controller function
} = require("../controllers/features");

// Route to get all features of a specific project
router.get("/project/:projectId", getAllFeaturesOfProject);

// New route to get features by assigned user ID
router.get("/assigned/:userId", getFeaturesByAssignedUser);

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
