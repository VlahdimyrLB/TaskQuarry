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
} = require("../controllers/features");

router.route("/").get(getAllFeatures);
router.route("/:projectId").post(createFeature); // create features
router
  .route("/:id")
  .get(getSingleFeature)
  .patch(updateFeature)
  .delete(deleteFeature)
  .post(createTask);
router.route("/:featureId/tasks/:taskId").patch(updateTask);

module.exports = router;
