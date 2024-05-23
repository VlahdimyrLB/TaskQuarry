import axios from "axios";

import {
  Button,
  Input,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Select,
  Option,
} from "@material-tailwind/react";

const AddFeatureDialog = ({
  users,
  projectID,
  newFeature,
  setNewFeature,
  openAddFeature,
  handleOpenAddFeature,
  setError,
  fetchFeatures,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewFeature((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (value) => {
    setNewFeature((prev) => ({
      ...prev,
      assignedTo: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/api/v1/features/${projectID}`, {
        ...newFeature,
        parentProject: projectID, // (Inserted since its not part of form) Assign the parent project ID to the feature
      });

      handleOpenAddFeature(!openAddFeature);
      fetchFeatures();
      // setFeatures((prevFeatures) => [...prevFeatures, data.feature]); no need since theres fetchFeatures()
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Dialog
      open={openAddFeature}
      handler={handleOpenAddFeature}
      size="sm"
      className="p-3"
    >
      <form onSubmit={handleSubmit}>
        <DialogHeader className="text-md text-gray-800 uppercase">
          Add New Feature
        </DialogHeader>
        <DialogBody className="flex flex-col gap-7">
          <Input
            label="Enter Feature Name"
            variant="standard"
            size="md"
            name="name"
            value={newFeature.name || ""}
            onChange={handleChange}
            required
          />
          <Input
            label="Enter Feature Description"
            variant="standard"
            size="md"
            name="description"
            value={newFeature.description || ""}
            onChange={handleChange}
            required
          />
          <Input
            type="date"
            label="Enter Due Date"
            variant="standard"
            size="md"
            name="dueDate"
            value={newFeature.dueDate || ""}
            onChange={handleChange}
          />
          <Select
            label="Assign To"
            variant="standard"
            size="md"
            name="assignedTo"
            value={newFeature.assignedTo || ""}
            onChange={handleSelectChange}
            required
          >
            {users.map((user) => (
              <Option key={user._id} value={user._id}>
                {user.name}
              </Option>
            ))}
          </Select>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button
            variant="outlined"
            onClick={handleOpenAddFeature}
            className="rounded-md hover:text-red-700 hover:border-red-700"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="filled"
            type="submit"
            className="rounded-md hover:opacity-75"
          >
            <span>Create</span>
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
};
export default AddFeatureDialog;
