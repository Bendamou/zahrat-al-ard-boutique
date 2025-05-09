
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Flower2, Home, Info, Mail, Settings, ShoppingBag, User, Tag, Globe, Image, Palette, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminSidebarProps {
  onLogout: () => void;
}

const AdminSidebar = ({ onLogout }: AdminSidebarProps) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname.includes(path);
  };
  
  const menuItems = [
    { name: "Tableau de bord", path: "/admin/dashboard", icon: Home },
    { name: "Produits", path: "/admin/products", icon: ShoppingBag },
    { name: "Catégories", path: "/admin/categories", icon: Tag },
    { name: "Messages", path: "/admin/messages", icon: MessageSquare },
    { name: "Images", path: "/admin/images", icon: Image },
    { name: "Page d'accueil", path: "/admin/home", icon: Home },
    { name: "À propos", path: "/admin/about", icon: Info },
    { name: "Contact", path: "/admin/contact", icon: Mail },
    { name: "Thème & Couleurs", path: "/admin/theme", icon: Palette },
    { name: "Langues", path: "/admin/languages", icon: Globe },
  ];

  return (
    <div className="bg-white border-r w-64 h-screen shadow-sm flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center space-x-3">
          <Flower2 className="text-floral-pink" size={24} />
          <span className="text-xl font-medium">Admin Panel</span>
        </div>
      </div>
      
      <div className="py-4 flex-1 overflow-auto">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-4 py-3 text-base hover:bg-gray-100 ${
              isActive(item.path) ? "bg-floral-cream text-floral-green font-medium" : "text-gray-700"
            }`}
          >
            <item.icon size={18} className="mr-3" />
            {item.name}
          </Link>
        ))}
      </div>
      
      <div className="p-4 border-t">
        <Button
          variant="ghost"
          className="flex items-center w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={onLogout}
        >
          <Settings size={18} className="mr-3" />
          Déconnexion
        </Button>
      </div>
    </div>
  );
};

export default AdminSidebar;
