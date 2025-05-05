
import { useState } from "react";
import { Flower2, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AdminLoginProps {
  onLogin: (username: string, password: string) => void;
}

const AdminLogin = ({ onLogin }: AdminLoginProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Veuillez remplir tous les champs");
      return;
    }
    onLogin(username, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-floral-cream to-white">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center">
            <Flower2 size={40} className="text-floral-green" />
          </div>
          <h1 className="font-amiri font-bold text-2xl mt-4 text-floral-green">
            لوحة إدارة زهرة الأرض
          </h1>
          <p className="text-gray-600 mt-2">Connexion administrateur</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nom d'utilisateur</label>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Entrez votre nom d'utilisateur"
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Mot de passe</label>
            <div className="relative">
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Entrez votre mot de passe"
                className="w-full"
              />
              <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-floral-green hover:bg-floral-green/90"
          >
            Connexion
          </Button>
          
          <div className="mt-4 text-center text-sm text-gray-500">
            <p>Identifiants temporaires: admin / password</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
