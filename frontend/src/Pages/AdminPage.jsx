import { useState } from "react";
import Sidebar from "../Components/Admin/Sidebar";
import Navbar from "../Components/Shared/Navbar";
import { Card } from "@material-tailwind/react";

const AdminPage = ({ user }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Navbar />
        {/* MAIN CONTENT SECTION */}
        <section className="bg-gray-100 h-screen text-white p-5">
          {/* TEST DASHBOARD CONTENT NOTE: NOT YET RESPONSIVE */}
          <p className="font-bold text-gray-800 mb-4">Dashboard</p>
          <div className="grid grid-cols-1 gap-4 mt-1 md:grid-cols-2 lg:grid-cols-3">
            <Card className="p-8 rounded-md h-72 mb-2 md:h-[300px] md:w-[400px]">
              This is a mf card
            </Card>
            <Card className="p-8 rounded-md h-72 mb-2 md:h-[300px] md:w-[400px]">
              This is a mf card
            </Card>
            <Card className="p-8 rounded-md h-72 mb-2 md:h-[300px] md:w-[400px]">
              This is a mf card
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminPage;
