const express = require("express");
const router = express.Router();
const {
  getAllFeatures,
  getSingleFeature,
  createFeature,
  updateFeature,
  deleteFeature,
} = require("../controllers/features");

router.route("/").get(getAllFeatures).post(createFeature);
router
  .route("/:")
  .get(getSingleFeature)
  .patch(updateFeature)
  .delete(deleteFeature);

module.exports = router;
