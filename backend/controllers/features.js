const Feature = require("../models/feature");
const Project = require("../models/project");

const getAllFeatures = async (req, res) => {
  try {
    const features = await Feature.find({});
    res.status(201).json({ features });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getAllFeaturesOfProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    // Find the project by ID
    const project = await Project.findById(projectId).populate("features");

    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }

    // Return the features of the project
    res.status(200).json({ features: project.features });
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

// const createFeature = async (req, res) => {
//   try {
//     const { projectId } = req.params;

//     const project = await Project.findById(projectId);
//     if (!project) {
//       return res.status(404).json({ msg: "Project not found" });
//     }

//     const feature = await Feature.create(req.body);
//     project.features.push(feature);

//     await project.save();

//     res.status(201).json({ feature });
//   } catch (error) {
//     res.status(500).json({ msg: error });
//   }
// };

const createFeature = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }

    const feature = await Feature.create(req.body);
    project.features.push(feature);
    if (req.body.assignedTo) {
      // Assuming you're passing the user ID in req.body.assignedTo
      feature.assignedTo = req.body.assignedTo;
    }

    await project.save();
    await feature.save();

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

// TASKS MANIPULATION
const createTask = async (req, res) => {
  try {
    const { id: featureId } = req.params;
    const feature = await Feature.findById(featureId);

    if (!feature) {
      return res.status(404).json({ msg: "Feature not found" });
    }

    // Create the task object based on the request body
    const task = {
      name: req.body.name,
      description: req.body.description,
    };

    // Add the task to the tasks array in the feature document
    feature.tasks.push(task);

    // Save the updated feature document
    await feature.save();

    res.status(201).json({ msg: "Task created successfully", task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateTask = async (req, res) => {
  try {
    const { featureId, taskId } = req.params;
    const { name, isDone } = req.body;

    // Find feature by ID
    const feature = await Feature.findById(featureId);

    if (!feature) {
      return res.status(404).json({ msg: "Feature not found" });
    }

    // Find task by ID within the feature
    const taskToUpdate = feature.tasks.id(taskId);

    if (!taskToUpdate) {
      return res.status(404).json({ msg: "Task not found" });
    }

    // Update the name and isDone fields of task
    if (name !== undefined) {
      taskToUpdate.name = name;
    }
    if (isDone !== undefined) {
      taskToUpdate.isDone = isDone;
    }

    // Save the updated feature document
    await feature.save();

    res
      .status(200)
      .json({ msg: "Task updated successfully", task: taskToUpdate });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { featureId, taskId } = req.params;

    // Find feature by ID
    const feature = await Feature.findById(featureId);

    if (!feature) {
      return res.status(404).json({ msg: "Feature not found" });
    }

    // Find index of the task in the tasks array
    const taskIndex = feature.tasks.findIndex((task) =>
      task._id.equals(taskId)
    );

    // Check if task exists
    if (taskIndex === -1) {
      return res.status(404).json({ msg: "Task not found" });
    }

    // Remove the task from the tasks array
    feature.tasks.splice(taskIndex, 1);

    // Save the updated feature document
    await feature.save();

    res.status(200).json({ msg: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// const assignUserToFeature = async (req, res) => {
//   try {
//     const { featureId } = req.params;
//     const { assignedTo } = req.body;

//     // Find the feature by ID and update the assignedTo field
//     const feature = await Feature.findByIdAndUpdate(
//       featureId,
//       { assignedTo },
//       { new: true }
//     );

//     if (!feature) {
//       return res.status(404).json({ msg: "Feature not found" });
//     }

//     res
//       .status(200)
//       .json({ msg: "User assigned to feature successfully", feature });
//   } catch (error) {
//     res.status(500).json({ msg: error.message });
//   }
// };

module.exports = {
  getAllFeatures,
  getSingleFeature,
  createFeature,
  updateFeature,
  deleteFeature,
  createTask,
  updateTask,
  deleteTask,
  getAllFeaturesOfProject,
  // assignUserToFeature,
};
