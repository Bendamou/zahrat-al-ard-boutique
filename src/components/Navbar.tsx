
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "الرئيسية", path: "/" },
    { name: "منتجاتنا", path: "/products" },
    { name: "من نحن", path: "/about" },
    { name: "اتصل بنا", path: "/contact" },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-amiri font-bold text-floral-green">
            زهرة الأرض
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 space-x-reverse">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-medium hover:text-floral-pink transition-colors ${
                  location.pathname === item.path
                    ? "text-floral-pink"
                    : "text-gray-700"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700 hover:text-floral-green"
            onClick={toggleMenu}
            aria-label="قائمة"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Panel */}
        {isOpen && (
          <div className="pt-3 pb-3 md:hidden animate-fade-in">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block py-2 px-4 rounded-md ${
                    location.pathname === item.path
                      ? "bg-floral-green text-white"
                      : "text-gray-700 hover:bg-floral-green/10"
                  }`}
                  onClick={toggleMenu}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
