import { useState } from "react";
import { LogOut, User, Menu, X } from "lucide-react";
import { Link } from "react-router-dom"; // assuming you're using react-router

export default function Navbar({ role }) {
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location = "/";
  };

  return (
    <div className="w-full bg-white/20 backdrop-blur-lg border-b border-white/30 shadow-md">
      
      <div className="flex justify-between items-center px-6 py-3">
        
        {/* Logo */}
        <h1 className="text-white text-xl font-bold">
          🎓 Exam Buddy
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-12  ">
          {/* Page Links */}
          <Link
            to="/about"
            className="text-white/80 hover:text-white transition font-medium"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-white/80 hover:text-white transition font-medium mr-12"
          >
            Contact
          </Link>

          {/* Role Info */}
          <div className="flex gap-3">
            <div className="flex items-center gap-2 text-white/80">
              <User size={18} />
              <span className="capitalize">{role}</span>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-white text-purple-600 px-3 py-1.5 rounded-lg font-medium hover:bg-purple-100 transition"
            >
            <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-3">
          <Link
            to="/about"
            className="text-white/80 hover:text-white transition font-medium"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-white/80 hover:text-white transition font-medium"
          >
            Contact
          </Link>

          <div className="flex items-center gap-2 text-white/80 mt-2">
            <User size={18} />
            <span className="capitalize">{role}</span>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 bg-white text-purple-600 px-3 py-2 rounded-lg font-medium hover:bg-purple-100 transition"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}