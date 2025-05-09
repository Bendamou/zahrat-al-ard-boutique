
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash2, Edit, Check, X, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";

interface Language {
  id: number;
  code: string;
  name: string;
  isDefault: boolean;
  active: boolean;
}

interface Translation {
  id: string;
  language_code: string;
  section: string;
  key: string;
  value: string;
}

interface GroupedTranslations {
  [section: string]: {
    [key: string]: {
      [language: string]: string;
      id?: string;
    };
  };
}

const LanguagesAdmin = () => {
  const [languages, setLanguages] = useState<Language[]>([
    { id: 1, code: "ar", name: "العربية", isDefault: true, active: true },
    { id: 2, code: "fr", name: "Français", isDefault: false, active: true },
    { id: 3, code: "en", name: "English", isDefault: false, active: true },
  ]);
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [groupedTranslations, setGroupedTranslations] = useState<GroupedTranslations>({});
  const [activeTab, setActiveTab] = useState("translations");
  const [editKey, setEditKey] = useState<string | null>(null);
  const [editSection, setEditSection] = useState<string | null>(null);
  const [editTranslations, setEditTranslations] = useState<Record<string, string>>({});
  const [newTranslation, setNewTranslation] = useState({
    section: "",
    key: "",
    ar: "",
    fr: "",
    en: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  
  const { toast } = useToast();

  // Fetch translations from database
  const fetchTranslations = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("translations")
        .select("*");
      
      if (error) {
        throw error;
      }
      
      if (data) {
        setTranslations(data);
        
        // Group translations by section and key
        const grouped: GroupedTranslations = {};
        data.forEach((item) => {
          if (!grouped[item.section]) {
            grouped[item.section] = {};
          }
          
          if (!grouped[item.section][item.key]) {
            grouped[item.section][item.key] = {};
          }
          
          grouped[item.section][item.key][item.language_code] = item.value;
          
          // For edit operations, store the id
          if (!grouped[item.section][item.key].id) {
            grouped[item.section][item.key].id = item.id;
          }
        });
        
        setGroupedTranslations(grouped);
      }
    } catch (error) {
      console.error("Error fetching translations:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les traductions",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTranslations();
  }, []);

  const handleStartEditTranslation = (section: string, key: string) => {
    setEditSection(section);
    setEditKey(key);
    
    const currentTranslations: Record<string, string> = {};
    languages.forEach(lang => {
      currentTranslations[lang.code] = groupedTranslations[section]?.[key]?.[lang.code] || "";
    });
    
    setEditTranslations(currentTranslations);
  };

  const handleSaveTranslation = async () => {
    if (editSection && editKey) {
      setIsLoading(true);
      
      try {
        for (const lang of languages) {
          const value = editTranslations[lang.code] || "";
          const existingTranslation = translations.find(
            t => t.section === editSection && t.key === editKey && t.language_code === lang.code
          );
          
          if (existingTranslation) {
            // Update existing translation
            await supabase
              .from("translations")
              .update({ value })
              .eq("id", existingTranslation.id);
          } else {
            // Create new translation
            await supabase
              .from("translations")
              .insert({
                language_code: lang.code,
                section: editSection,
                key: editKey,
                value
              });
          }
        }
        
        toast({
          title: "Traduction mise à jour",
          description: "Les traductions ont été enregistrées avec succès"
        });
        
        // Refresh translations
        await fetchTranslations();
      } catch (error) {
        console.error("Error saving translations:", error);
        toast({
          title: "Erreur",
          description: "Impossible de sauvegarder les traductions",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
        setEditSection(null);
        setEditKey(null);
      }
    }
  };

  const handleCancelEdit = () => {
    setEditSection(null);
    setEditKey(null);
  };

  const handleAddTranslation = async () => {
    if (!newTranslation.section || !newTranslation.key) {
      toast({
        title: "Erreur",
        description: "Veuillez spécifier une section et une clé",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const promises = [];
      
      for (const lang of languages) {
        const value = newTranslation[lang.code as keyof typeof newTranslation] || "";
        
        promises.push(
          supabase
            .from("translations")
            .insert({
              language_code: lang.code,
              section: newTranslation.section,
              key: newTranslation.key,
              value: value.toString()
            })
        );
      }
      
      await Promise.all(promises);
      
      toast({
        title: "Traduction ajoutée",
        description: "La nouvelle traduction a été ajoutée avec succès"
      });
      
      // Reset form and refresh translations
      setNewTranslation({
        section: "",
        key: "",
        ar: "",
        fr: "",
        en: ""
      });
      
      await fetchTranslations();
    } catch (error) {
      console.error("Error adding translation:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter la traduction",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des langues</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="translations">Traductions</TabsTrigger>
        </TabsList>

        <TabsContent value="translations" className="space-y-6">
          {/* Add new translation form */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Ajouter une nouvelle traduction</h2>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
              <div>
                <Label htmlFor="new-section">Section</Label>
                <Input
                  id="new-section"
                  value={newTranslation.section}
                  onChange={(e) => setNewTranslation({ ...newTranslation, section: e.target.value })}
                  placeholder="ex: common, product"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="new-key">Clé</Label>
                <Input
                  id="new-key"
                  value={newTranslation.key}
                  onChange={(e) => setNewTranslation({ ...newTranslation, key: e.target.value })}
                  placeholder="ex: home, products"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="new-ar">Arabe (العربية)</Label>
                <Input
                  id="new-ar"
                  value={newTranslation.ar}
                  onChange={(e) => setNewTranslation({ ...newTranslation, ar: e.target.value })}
                  placeholder="Traduction en arabe"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="new-fr">Français</Label>
                <Input
                  id="new-fr"
                  value={newTranslation.fr}
                  onChange={(e) => setNewTranslation({ ...newTranslation, fr: e.target.value })}
                  placeholder="Traduction en français"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="new-en">Anglais (English)</Label>
                <Input
                  id="new-en"
                  value={newTranslation.en}
                  onChange={(e) => setNewTranslation({ ...newTranslation, en: e.target.value })}
                  placeholder="Traduction en anglais"
                  className="mt-1"
                />
              </div>
            </div>
            <Button 
              onClick={handleAddTranslation} 
              className="bg-floral-green hover:bg-floral-green/90 mt-4"
              disabled={isLoading}
            >
              <Plus size={16} className="mr-2" />
              Ajouter
            </Button>
          </div>

          {/* List of translations by section */}
          {isLoading && (
            <div className="flex justify-center py-8">
              <div className="w-8 h-8 border-4 border-floral-green rounded-full border-t-transparent animate-spin"></div>
            </div>
          )}
          
          {Object.entries(groupedTranslations).map(([section, keys]) => (
            <div key={section} className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4 capitalize">{section}</h2>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Clé</TableHead>
                    {languages.map(lang => (
                      <TableHead key={lang.id}>{lang.name}</TableHead>
                    ))}
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(keys).map(([key, values]) => (
                    <TableRow key={key}>
                      <TableCell className="font-medium">{key}</TableCell>
                      
                      {editSection === section && editKey === key ? (
                        <>
                          {languages.map(lang => (
                            <TableCell key={lang.id}>
                              <Input
                                value={editTranslations[lang.code] || ""}
                                onChange={(e) => setEditTranslations({
                                  ...editTranslations,
                                  [lang.code]: e.target.value
                                })}
                                disabled={isLoading}
                              />
                            </TableCell>
                          ))}
                          <TableCell className="flex justify-end space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-green-500 hover:text-green-700"
                              onClick={handleSaveTranslation}
                              disabled={isLoading}
                            >
                              <Check size={16} />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-500 hover:text-red-700"
                              onClick={handleCancelEdit}
                              disabled={isLoading}
                            >
                              <X size={16} />
                            </Button>
                          </TableCell>
                        </>
                      ) : (
                        <>
                          {languages.map(lang => (
                            <TableCell key={lang.id}>
                              {values[lang.code] || "-"}
                            </TableCell>
                          ))}
                          <TableCell className="flex justify-end">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleStartEditTranslation(section, key)}
                              disabled={isLoading}
                            >
                              <Edit size={16} />
                            </Button>
                          </TableCell>
                        </>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LanguagesAdmin;
