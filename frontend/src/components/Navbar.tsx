import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white border-b border-gray-200 px-8 py-5 flex items-center justify-between shadow-sm">
      <div className="flex items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Ikonex Academy</h2>
      </div>

      <div className="flex items-center gap-8">
        <div className="text-right">
          <p className="font-semibold text-gray-800">{user?.name || "Administrator"}</p>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>

        <button
          onClick={logout}
          className="px-6 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl border border-red-100 hover:border-red-200 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
