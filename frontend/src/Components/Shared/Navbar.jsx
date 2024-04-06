const Navbar = () => {
  return (
    <nav>
      <div className="flex flex-col flex-1 overflow-y-auto">
        <div className="flex items-center justify-between h-12 bg-white border-b border-gray-200">
          <div className="flex items-center px-4">
            {/* HAMBURGER TOGGLE */}
            <button className="text-gray-500 focus:outline-none focus:text-gray-700 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            {/* <input className="mx-4 w-full border rounded-md px-4 py-2" type="text" placeholder="Search"> */}
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
