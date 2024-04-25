import Navbar from "../../Components/Shared/Navbar";
import { Card } from "@material-tailwind/react";
const Dashboard = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 mt-1 lg:grid-cols-3">
        <Card className="p-8 rounded-md h-72 w-auto mb-2 md:h-[300px] dark:bg-dark-secondary dark:text-[#E6EDF3]">
          This is a mf card
        </Card>
        <Card className="p-8 rounded-md h-72 w-auto mb-2 md:h-[300px] dark:bg-dark-secondary dark:text-[#E6EDF3]">
          This is a mf card
        </Card>
        <Card className="p-8 rounded-md h-72 w-auto mb-2 md:h-[300px] dark:bg-dark-secondary dark:text-[#E6EDF3]">
          This is a mf card
        </Card>
      </div>
    </>
  );
};
export default Dashboard;
