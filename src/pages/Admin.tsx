
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AdminLogin from "../components/admin/AdminLogin";
import AdminSidebar from "../components/admin/AdminSidebar";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (username: string, password: string) => {
    // Ceci est temporaire jusqu'à l'intégration de Supabase
    if (username === "admin" && password === "password") {
      setIsAuthenticated(true);
      localStorage.setItem("adminAuth", "true");
      navigate("/admin/products");
    }
  };

  // Vérifier si l'utilisateur était déjà authentifié
  useState(() => {
    if (localStorage.getItem("adminAuth") === "true") {
      setIsAuthenticated(true);
    }
  });

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <div className="bg-gray-100 min-h-screen flex">
      <AdminSidebar />
      <div className="flex-1 p-8 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
