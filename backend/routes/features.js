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
  getFeaturesByAssignedUser,
  updateFeatureStatus,
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
  .delete(deleteFeature);
router.route("/:featureId/tasks").post(createTask); // create taskss
router.route("/:featureId/tasks/:taskId").patch(updateTask).delete(deleteTask);

// New route for updating feature status
router.route("/update-status/:id").patch(updateFeatureStatus);

module.exports = router;
