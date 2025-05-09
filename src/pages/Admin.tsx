
import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import AdminLogin from "../components/admin/AdminLogin";
import AdminSidebar from "../components/admin/AdminSidebar";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const handleLogin = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from("admin_users")
        .select()
        .eq("email", email)
        .single();
      
      if (error || !data) {
        throw new Error("Identifiants invalides");
      }
      
      // Simple password check (in a real app, passwords should be hashed)
      if (data.password === password) {
        setIsAuthenticated(true);
        localStorage.setItem("adminAuth", "true");
        localStorage.setItem("adminEmail", email);
        toast({
          title: "Connexion réussie",
          description: "Bienvenue dans l'espace administration",
        });
        navigate("/admin/dashboard");
      } else {
        throw new Error("Mot de passe incorrect");
      }
    } catch (error) {
      toast({
        title: "Erreur de connexion",
        description: error instanceof Error ? error.message : "Identifiants invalides",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("adminAuth");
    localStorage.removeItem("adminEmail");
    navigate("/admin");
  };

  // Check if user was already authenticated
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      const adminAuth = localStorage.getItem("adminAuth");
      const adminEmail = localStorage.getItem("adminEmail");
      
      if (adminAuth === "true" && adminEmail) {
        // Verify admin still exists in database
        const { data } = await supabase
          .from("admin_users")
          .select()
          .eq("email", adminEmail)
          .single();
          
        if (data) {
          setIsAuthenticated(true);
          
          // Redirect to dashboard if the user is at /admin
          if (location.pathname === "/admin") {
            navigate("/admin/dashboard");
          }
        } else {
          // Admin no longer exists in DB, log out
          handleLogout();
        }
      }
      setIsLoading(false);
    };
    
    checkAuth();
  }, [location, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-floral-green rounded-full border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <div className="bg-gray-100 min-h-screen flex">
      <AdminSidebar onLogout={handleLogout} />
      <div className="flex-1 p-8 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
