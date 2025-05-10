
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Package, 
  Home,
  Info,
  Contact,
  LogOut, 
  Tag,
} from "lucide-react";

interface AdminSidebarProps {
  onLogout: () => void;
}

const AdminSidebar = ({ onLogout }: AdminSidebarProps) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const menuItems = [
    {
      name: "لوحة التحكم",
      icon: <LayoutDashboard size={18} />,
      path: "/admin/dashboard"
    },
    {
      name: "المنتجات",
      icon: <Package size={18} />,
      path: "/admin/products"
    },
    {
      name: "التصنيفات",
      icon: <Tag size={18} />,
      path: "/admin/categories"
    },
    {
      name: "الصفحة الرئيسية",
      icon: <Home size={18} />,
      path: "/admin/home"
    },
    {
      name: "من نحن",
      icon: <Info size={18} />,
      path: "/admin/about"
    },
    {
      name: "اتصل بنا",
      icon: <Contact size={18} />,
      path: "/admin/contact"
    }
  ];
  
  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen py-4">
      <div className="px-6 mb-8">
        <h2 className="text-xl font-bold text-floral-green">
          لوحة الإدارة
        </h2>
      </div>
      
      <nav className="space-y-1">
        {menuItems.map((item) => (
          <Link to={item.path} key={item.path}>
            <Button
              variant={isActive(item.path) ? "default" : "ghost"} 
              className={`w-full justify-start ${
                isActive(item.path) 
                  ? "bg-floral-green text-white hover:bg-floral-green/90" 
                  : "text-gray-600"
              }`}
            >
              <span className="ml-2">{item.icon}</span>
              {item.name}
            </Button>
          </Link>
        ))}
        
        <div className="pt-6">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={onLogout}
          >
            <LogOut className="ml-2" size={18} />
            تسجيل الخروج
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default AdminSidebar;
