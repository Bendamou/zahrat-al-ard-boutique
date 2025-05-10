
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
  Globe
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface AdminSidebarProps {
  onLogout: () => void;
}

const AdminSidebar = ({ onLogout }: AdminSidebarProps) => {
  const location = useLocation();
  const { currentLanguage, t } = useLanguage();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const menuItems = [
    {
      name: currentLanguage === "fr" ? "Tableau de bord" : (currentLanguage === "en" ? "Dashboard" : "لوحة التحكم"),
      icon: <LayoutDashboard size={18} />,
      path: "/admin/dashboard"
    },
    {
      name: currentLanguage === "fr" ? "Produits" : (currentLanguage === "en" ? "Products" : "المنتجات"),
      icon: <Package size={18} />,
      path: "/admin/products"
    },
    {
      name: currentLanguage === "fr" ? "Catégories" : (currentLanguage === "en" ? "Categories" : "التصنيفات"),
      icon: <Tag size={18} />,
      path: "/admin/categories"
    },
    {
      name: currentLanguage === "fr" ? "Page d'accueil" : (currentLanguage === "en" ? "Home Page" : "الصفحة الرئيسية"),
      icon: <Home size={18} />,
      path: "/admin/home"
    },
    {
      name: currentLanguage === "fr" ? "À propos" : (currentLanguage === "en" ? "About" : "من نحن"),
      icon: <Info size={18} />,
      path: "/admin/about"
    },
    {
      name: currentLanguage === "fr" ? "Contact" : (currentLanguage === "en" ? "Contact" : "اتصل بنا"),
      icon: <Contact size={18} />,
      path: "/admin/contact"
    },
    {
      name: currentLanguage === "fr" ? "Langues" : (currentLanguage === "en" ? "Languages" : "اللغات"),
      icon: <Globe size={18} />,
      path: "/admin/languages"
    }
  ];
  
  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen py-4">
      <div className="px-6 mb-8">
        <h2 className="text-xl font-bold text-floral-green">
          {currentLanguage === "fr" ? "Panneau d'admin" : 
           (currentLanguage === "en" ? "Admin Panel" : "لوحة الإدارة")}
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
              <span className="mr-2">{item.icon}</span>
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
            <LogOut className="mr-2" size={18} />
            {currentLanguage === "fr" ? "Déconnexion" : 
             (currentLanguage === "en" ? "Logout" : "تسجيل الخروج")}
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default AdminSidebar;
