import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/students", label: "Students" },
    { path: "/class-streams", label: "Class Streams" },
    { path: "/subjects", label: "Subjects" },
    { path: "/scores", label: "Assessment & Scoring" },
    { path: "/reports", label: "Reports" },
  ];

  return (
    <div className="w-72 bg-white h-screen border-r border-gray-200 flex flex-col shadow-sm">
      <div className="p-8">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 bg-blue-700 text-white rounded-xl flex items-center justify-center font-bold text-2xl">
            IA
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Ikonex</h1>
            <p className="text-sm text-gray-500 -mt-1">Academy</p>
          </div>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-6 py-3.5 rounded-xl text-[15px] font-medium transition-all ${
                location.pathname === item.path
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
