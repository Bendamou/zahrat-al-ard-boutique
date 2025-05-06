
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Palette, RefreshCw } from "lucide-react";

// Données temporaires pour les couleurs par défaut
const defaultTheme = {
  primary: {
    name: "Vert floral (principal)",
    color: "#3a7563",
    variable: "--floral-green"
  },
  secondary: {
    name: "Rose floral (secondaire)",
    color: "#e07a7a",
    variable: "--floral-pink"
  },
  accent: {
    name: "Crème floral (accent)",
    color: "#f6f2e4",
    variable: "--floral-cream"
  },
  background: {
    name: "Arrière-plan",
    color: "#ffffff",
    variable: "--background"
  },
  text: {
    name: "Texte principal",
    color: "#333333",
    variable: "--text-primary"
  },
  button: {
    name: "Texte de bouton",
    color: "#ffffff",
    variable: "--button-text"
  },
  border: {
    name: "Bordures",
    color: "#e5e5e5",
    variable: "--border-color"
  }
};

const ThemeAdmin = () => {
  const [theme, setTheme] = useState(defaultTheme);
  const [activeTab, setActiveTab] = useState("colors");
  const { toast } = useToast();

  const handleColorChange = (key: keyof typeof theme, value: string) => {
    setTheme({
      ...theme,
      [key]: {
        ...theme[key],
        color: value
      }
    });
  };

  const handleSaveChanges = () => {
    // Cette fonction serait implémentée avec la BD pour sauvegarder les couleurs
    // Pour l'instant, on affiche juste un toast de confirmation
    toast({
      title: "Thème mis à jour",
      description: "Les changements ont été appliqués avec succès."
    });
  };

  const handleResetTheme = () => {
    setTheme(defaultTheme);
    toast({
      title: "Thème réinitialisé",
      description: "Les couleurs par défaut ont été restaurées."
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Thème et Couleurs</h1>
        <Button variant="outline" onClick={handleResetTheme}>
          <RefreshCw size={16} className="mr-2" />
          Réinitialiser
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="colors">Couleurs</TabsTrigger>
          <TabsTrigger value="typography">Typographie</TabsTrigger>
          <TabsTrigger value="spacing">Espacement</TabsTrigger>
        </TabsList>

        <TabsContent value="colors" className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Palette size={20} className="mr-2 text-floral-pink" />
              Palette de couleurs
            </h2>
            
            <div className="grid gap-6 md:grid-cols-2">
              {Object.entries(theme).map(([key, color]) => (
                <div key={key} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor={`color-${key}`} className="font-medium">
                      {color.name}
                    </Label>
                    <span className="text-xs text-gray-500">{color.variable}</span>
                  </div>
                  
                  <div className="flex gap-3">
                    <div 
                      className="w-12 h-8 rounded border" 
                      style={{ backgroundColor: color.color }}
                    />
                    <Input
                      id={`color-${key}`}
                      type="color"
                      value={color.color}
                      onChange={(e) => handleColorChange(key as keyof typeof theme, e.target.value)}
                      className="w-full h-8"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Aperçu du thème</h2>
            
            <div className="space-y-6">
              <div className="p-4 rounded" style={{ backgroundColor: theme.background.color }}>
                <h3 className="text-xl font-bold mb-2" style={{ color: theme.text.color }}>
                  Exemple de titre
                </h3>
                <p className="mb-4" style={{ color: theme.text.color }}>
                  Voici un exemple de texte pour montrer comment les couleurs s'appliquent sur votre site.
                </p>
                
                <div className="flex gap-2">
                  <Button 
                    style={{ 
                      backgroundColor: theme.primary.color, 
                      color: theme.button.color,
                      borderColor: theme.border.color 
                    }}
                  >
                    Bouton principal
                  </Button>
                  
                  <Button 
                    variant="outline"
                    style={{ 
                      color: theme.primary.color,
                      borderColor: theme.primary.color 
                    }}
                  >
                    Bouton secondaire
                  </Button>
                </div>
              </div>
              
              <div 
                className="p-4 rounded" 
                style={{ backgroundColor: theme.accent.color }}
              >
                <p style={{ color: theme.text.color }}>
                  Ceci est un exemple de section avec la couleur d'accent.
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button onClick={handleSaveChanges} className="bg-floral-green hover:bg-floral-green/90">
              Enregistrer les changements
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="typography" className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6 flex items-center justify-center">
            <p className="text-xl text-center text-gray-500">
              Cette fonctionnalité sera disponible prochainement
            </p>
          </div>
        </TabsContent>

        <TabsContent value="spacing" className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6 flex items-center justify-center">
            <p className="text-xl text-center text-gray-500">
              Cette fonctionnalité sera disponible prochainement
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ThemeAdmin;
