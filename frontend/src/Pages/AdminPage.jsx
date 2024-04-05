import Sidebar from "../Components/Admin/Sidebar";
import Navbar from "../Components/Shared/Navbar";

const AdminPage = ({ user }) => {
  return (
    <div className="relative">
      <nav className="fixed top-0 left-80 right-0 h-10 bg-white z-10 py-2">
        <Navbar />
      </nav>

      <aside className="fixed top-0 left-0 bottom-0 h-screen w-80 z-10">
        <Sidebar />
      </aside>

      <section className="ml-80 mt-10  bg-[#f8fafc] ">
        {/* Load Pages Here */}
        <p className="py-96">
          .............................SECTION..................................................................
        </p>
      </section>
    </div>
  );
};

export default AdminPage;
