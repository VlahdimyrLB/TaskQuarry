import Navbar from "../../Components/Shared/Navbar";
import { Card } from "@material-tailwind/react";
import { useDarkMode } from "../../Hooks/useDarkMode";
const Dashboard = () => {
  const { darkMode } = useDarkMode();
  return (
    <>
      <div className="grid grid-cols-1 gap-4 mt-1 lg:grid-cols-3">
        <Card
          className={`p-8 rounded-md h-72 w-auto mb-2 md:h-[300px] ${
            darkMode && "bg-dark-100 text-white"
          }`}
        >
          This is a mf card
        </Card>
        <Card
          className={`p-8 rounded-md h-72 w-auto mb-2 md:h-[300px] ${
            darkMode && "bg-dark-100 text-white"
          }`}
        >
          This is a mf card
        </Card>
        <Card
          className={`p-8 rounded-md h-72 w-auto mb-2 md:h-[300px] ${
            darkMode && "bg-dark-100 text-white"
          }`}
        >
          This is a mf card
        </Card>
        <Card
          className={`p-8 rounded-md h-72 w-auto mb-2 md:h-[300px] ${
            darkMode && "bg-dark-100 text-white"
          }`}
        >
          This is a mf card
        </Card>
        <Card
          className={`p-8 rounded-md h-72 w-auto mb-2 md:h-[300px] ${
            darkMode && "bg-dark-100 text-white"
          }`}
        >
          This is a mf card
        </Card>
        <Card
          className={`p-8 rounded-md h-72 w-auto mb-2 md:h-[300px] ${
            darkMode && "bg-[#191D1F] text-white"
          }`}
        >
          This is a mf card
        </Card>
      </div>
    </>
  );
};
export default Dashboard;
