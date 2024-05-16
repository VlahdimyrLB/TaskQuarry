import { useState, useEffect, useContext } from "react";
import { AssignedTable } from "../../Components/Admin/Assigned/AssignedTable";
import axios from "axios";
import { AuthContext } from "../../App";

const Assigned = () => {
  return (
    <>
      <AssignedTable />
    </>
  );
};

export default Assigned;
