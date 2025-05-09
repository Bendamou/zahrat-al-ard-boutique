
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Palette, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface ThemeColor {
  name: string;
  color: string;
  variable: string;
  key: string;
}

const ThemeAdmin = () => {
  const [theme, setTheme] = useState<Record<string, ThemeColor>>({});
  const [defaultTheme, setDefaultTheme] = useState<Record<string, ThemeColor>>({});
  const [activeTab, setActiveTab] = useState("colors");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Fetch theme settings from database
  useEffect(() => {
    const fetchThemeSettings = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("theme_settings")
          .select("*");
        
        if (error) {
          throw error;
        }
        
        if (data) {
          const themeData: Record<string, ThemeColor> = {
            primary: {
              name: "Vert floral (principal)",
              color: "#3a7563",
              variable: "--floral-green",
              key: "primary-color"
            },
            secondary: {
              name: "Rose floral (secondaire)",
              color: "#e07a7a",
              variable: "--floral-pink",
              key: "secondary-color"
            },
            accent: {
              name: "Crème floral (accent)",
              color: "#f6f2e4",
              variable: "--floral-cream",
              key: "accent-color"
            },
            background: {
              name: "Arrière-plan",
              color: "#ffffff",
              variable: "--background",
              key: "background-color"
            },
            text: {
              name: "Texte principal",
              color: "#333333",
              variable: "--text-primary",
              key: "text-color"
            },
            button: {
              name: "Texte de bouton",
              color: "#ffffff",
              variable: "--button-text",
              key: "button-text-color"
            },
            border: {
              name: "Bordures",
              color: "#e5e5e5",
              variable: "--border-color",
              key: "border-color"
            }
          };

          // Update with values from database
          data.forEach(item => {
            const key = item.key;
            const entry = Object.values(themeData).find(color => color.key === key);
            
            if (entry) {
              const themeKey = Object.keys(themeData).find(k => themeData[k].key === key);
              if (themeKey) {
                themeData[themeKey].color = item.value;
              }
            }
          });
          
          setTheme(themeData);
          setDefaultTheme({...themeData});
          
          // Apply theme to the document
          applyThemeToDocument(themeData);
        }
      } catch (error) {
        console.error("Error fetching theme settings:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les paramètres du thème",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchThemeSettings();
  }, []);

  const applyThemeToDocument = (themeData: Record<string, ThemeColor>) => {
    Object.values(themeData).forEach(colorItem => {
      document.documentElement.style.setProperty(colorItem.variable, colorItem.color);
    });
  };

  const handleColorChange = (key: string, value: string) => {
    setTheme(prev => {
      const newTheme = {...prev};
      newTheme[key].color = value;
      return newTheme;
    });
  };

  const handleSaveChanges = async () => {
    setIsLoading(true);
    try {
      // Update each color in database
      for (const colorKey in theme) {
        const colorItem = theme[colorKey];
        
        await supabase
          .from("theme_settings")
          .update({ value: colorItem.color })
          .eq("key", colorItem.key);
      }
      
      // Apply theme to document
      applyThemeToDocument(theme);
      
      toast({
        title: "Thème mis à jour",
        description: "Les changements ont été appliqués avec succès."
      });
    } catch (error) {
      console.error("Error saving theme settings:", error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder les paramètres du thème",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetTheme = async () => {
    setIsLoading(true);
    try {
      setTheme({...defaultTheme});
      
      // Update database with default values
      for (const colorKey in defaultTheme) {
        const colorItem = defaultTheme[colorKey];
        
        await supabase
          .from("theme_settings")
          .update({ value: colorItem.color })
          .eq("key", colorItem.key);
      }
      
      // Apply theme to document
      applyThemeToDocument(defaultTheme);
      
      toast({
        title: "Thème réinitialisé",
        description: "Les couleurs par défaut ont été restaurées."
      });
    } catch (error) {
      console.error("Error resetting theme:", error);
      toast({
        title: "Erreur",
        description: "Impossible de réinitialiser le thème",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && Object.keys(theme).length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-12 h-12 border-4 border-floral-green rounded-full border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Thème et Couleurs</h1>
        <Button variant="outline" onClick={handleResetTheme} disabled={isLoading}>
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
                      onChange={(e) => handleColorChange(key, e.target.value)}
                      className="w-full h-8"
                      disabled={isLoading}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Aperçu du thème</h2>
            
            <div className="space-y-6">
              <div className="p-4 rounded" style={{ backgroundColor: theme.background?.color || "#ffffff" }}>
                <h3 className="text-xl font-bold mb-2" style={{ color: theme.text?.color || "#333333" }}>
                  Exemple de titre
                </h3>
                <p className="mb-4" style={{ color: theme.text?.color || "#333333" }}>
                  Voici un exemple de texte pour montrer comment les couleurs s'appliquent sur votre site.
                </p>
                
                <div className="flex gap-2">
                  <Button 
                    style={{ 
                      backgroundColor: theme.primary?.color || "#3a7563", 
                      color: theme.button?.color || "#ffffff",
                      borderColor: theme.border?.color || "#e5e5e5"
                    }}
                  >
                    Bouton principal
                  </Button>
                  
                  <Button 
                    variant="outline"
                    style={{ 
                      color: theme.primary?.color || "#3a7563",
                      borderColor: theme.primary?.color || "#3a7563"
                    }}
                  >
                    Bouton secondaire
                  </Button>
                </div>
              </div>
              
              <div 
                className="p-4 rounded" 
                style={{ backgroundColor: theme.accent?.color || "#f6f2e4" }}
              >
                <p style={{ color: theme.text?.color || "#333333" }}>
                  Ceci est un exemple de section avec la couleur d'accent.
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button 
              onClick={handleSaveChanges} 
              className="bg-floral-green hover:bg-floral-green/90"
              disabled={isLoading}
            >
              {isLoading ? "Enregistrement en cours..." : "Enregistrer les changements"}
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
