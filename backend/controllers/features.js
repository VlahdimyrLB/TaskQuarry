const Feature = require("../models/feature");

const getAllFeatures = async (req, res) => {
  try {
    const features = await Feature.find({});
    res.status(201).json({ features });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getSingleFeature = async (req, res) => {
  try {
    const { id: featureID } = req.params;
    const feature = await Feature.findById({ _id: featureID });
    res.status(201).json({ feature });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const createFeature = async (req, res) => {
  try {
    const feature = await Feature.create(req.body);
    res.status(201).json({ feature });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateFeature = async (req, res) => {
  try {
    const { id: featureID } = req.params;
    const data = req.body;
    const feature = await Feature.findOneAndUpdate({ _id: featureID }, data, {
      new: true,
      runValidators: true,
    });
    if (!feature) {
      return res.status(404).json({ msg: `No feature with id: ${feature}` });
    }
    res.status(201).json({ feature });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

// TODO: ADD PROPER VALIDATION it should not be deleted if feature has tasks
const deleteFeature = async (req, res) => {
  try {
    const { id: featureID } = req.params;
    const feature = await Feature.findOneAndDelete({ _id: featureID });
    if (!feature) {
      return res.status(404).json({ msg: `No feature with id: ${feature}` });
    }
    res.status(201).json({ feature });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  getAllFeatures,
  getSingleFeature,
  createFeature,
  updateFeature,
  deleteFeature,
};
