
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash2, Edit, Check, X, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Données temporaires pour les langues et traductions
const initialLanguages = [
  { id: 1, code: "ar", name: "العربية", isDefault: true, active: true },
  { id: 2, code: "fr", name: "Français", isDefault: false, active: true },
];

const translationKeys = {
  common: {
    home: { ar: "الرئيسية", fr: "Accueil" },
    products: { ar: "المنتجات", fr: "Produits" },
    about: { ar: "عن المتجر", fr: "À propos" },
    contact: { ar: "اتصل بنا", fr: "Contact" },
    welcome: { ar: "أهلا بك في متجرنا", fr: "Bienvenue sur notre boutique" },
  },
  product: {
    price: { ar: "السعر", fr: "Prix" },
    category: { ar: "الفئة", fr: "Catégorie" },
    addToCart: { ar: "أضف إلى السلة", fr: "Ajouter au panier" },
    contactUs: { ar: "تواصل معنا", fr: "Contactez-nous" },
    description: { ar: "الوصف", fr: "Description" },
  }
};

const LanguagesAdmin = () => {
  const [languages, setLanguages] = useState(initialLanguages);
  const [newLanguage, setNewLanguage] = useState({ code: "", name: "" });
  const [translations, setTranslations] = useState(translationKeys);
  const [activeTab, setActiveTab] = useState("languages");
  const [editKey, setEditKey] = useState<string | null>(null);
  const [editSection, setEditSection] = useState<string | null>(null);
  const [editTranslations, setEditTranslations] = useState<Record<string, string>>({});
  
  const { toast } = useToast();

  const handleAddLanguage = () => {
    if (!newLanguage.code.trim() || !newLanguage.name.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer un code et un nom pour la langue",
        variant: "destructive"
      });
      return;
    }

    const newId = Math.max(0, ...languages.map(lang => lang.id)) + 1;
    setLanguages([...languages, {
      id: newId,
      code: newLanguage.code.toLowerCase(),
      name: newLanguage.name,
      isDefault: false,
      active: true
    }]);

    setNewLanguage({ code: "", name: "" });
    
    toast({
      title: "Langue ajoutée",
      description: `La langue "${newLanguage.name}" a été ajoutée avec succès`
    });
  };

  const handleDeleteLanguage = (id: number) => {
    if (languages.find(lang => lang.id === id)?.isDefault) {
      toast({
        title: "Action impossible",
        description: "Vous ne pouvez pas supprimer la langue par défaut",
        variant: "destructive"
      });
      return;
    }
    
    const langName = languages.find(lang => lang.id === id)?.name;
    setLanguages(languages.filter(lang => lang.id !== id));
    
    toast({
      title: "Langue supprimée",
      description: `La langue "${langName}" a été supprimée avec succès`
    });
  };

  const handleToggleActive = (id: number) => {
    if (languages.find(lang => lang.id === id)?.isDefault) {
      toast({
        title: "Action impossible",
        description: "Vous ne pouvez pas désactiver la langue par défaut",
        variant: "destructive"
      });
      return;
    }
    
    setLanguages(languages.map(lang => 
      lang.id === id ? { ...lang, active: !lang.active } : lang
    ));
    
    const lang = languages.find(lang => lang.id === id);
    const status = lang?.active ? "désactivée" : "activée";
    
    toast({
      title: "Statut modifié",
      description: `La langue "${lang?.name}" a été ${status} avec succès`
    });
  };

  const handleSetDefault = (id: number) => {
    setLanguages(languages.map(lang => ({
      ...lang,
      isDefault: lang.id === id,
      active: lang.id === id ? true : lang.active // La langue par défaut doit être active
    })));
    
    const langName = languages.find(lang => lang.id === id)?.name;
    
    toast({
      title: "Langue par défaut modifiée",
      description: `"${langName}" est maintenant la langue par défaut`
    });
  };

  const handleStartEditTranslation = (section: string, key: string) => {
    setEditSection(section);
    setEditKey(key);
    
    const currentTranslations: Record<string, string> = {};
    languages.forEach(lang => {
      currentTranslations[lang.code] = translations[section][key][lang.code] || "";
    });
    
    setEditTranslations(currentTranslations);
  };

  const handleSaveTranslation = () => {
    if (editSection && editKey) {
      const updatedTranslations = { ...translations };
      
      languages.forEach(lang => {
        updatedTranslations[editSection][editKey][lang.code] = editTranslations[lang.code] || "";
      });
      
      setTranslations(updatedTranslations);
      setEditSection(null);
      setEditKey(null);
      
      toast({
        title: "Traduction mise à jour",
        description: "Les traductions ont été enregistrées avec succès"
      });
    }
  };

  const handleCancelEdit = () => {
    setEditSection(null);
    setEditKey(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des langues</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="languages">Langues</TabsTrigger>
          <TabsTrigger value="translations">Traductions</TabsTrigger>
        </TabsList>

        <TabsContent value="languages" className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Ajouter une nouvelle langue</h2>
            
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <Label htmlFor="lang-code">Code de la langue</Label>
                <Input
                  id="lang-code"
                  value={newLanguage.code}
                  onChange={(e) => setNewLanguage({ ...newLanguage, code: e.target.value })}
                  placeholder="ex: en, fr, es"
                  className="mt-1"
                  maxLength={2}
                />
              </div>
              
              <div>
                <Label htmlFor="lang-name">Nom de la langue</Label>
                <Input
                  id="lang-name"
                  value={newLanguage.name}
                  onChange={(e) => setNewLanguage({ ...newLanguage, name: e.target.value })}
                  placeholder="ex: English, Français, Español"
                  className="mt-1"
                />
              </div>
              
              <div className="flex items-end">
                <Button 
                  onClick={handleAddLanguage} 
                  className="bg-floral-green hover:bg-floral-green/90 mt-1 w-full"
                >
                  <Plus size={16} className="mr-2" />
                  Ajouter
                </Button>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Nom</TableHead>
                  <TableHead>Par défaut</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {languages.length > 0 ? (
                  languages.map((language) => (
                    <TableRow key={language.id}>
                      <TableCell className="font-medium">{language.code}</TableCell>
                      <TableCell className="flex items-center">
                        <Globe size={16} className="mr-2 text-gray-500" />
                        {language.name}
                      </TableCell>
                      <TableCell>
                        {language.isDefault ? (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <Check size={12} className="mr-1" />
                            Par défaut
                          </span>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSetDefault(language.id)}
                          >
                            Définir par défaut
                          </Button>
                        )}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            language.active
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {language.active ? "Actif" : "Inactif"}
                        </span>
                      </TableCell>
                      <TableCell className="flex justify-end space-x-2">
                        {!language.isDefault && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleToggleActive(language.id)}
                            >
                              {language.active ? "Désactiver" : "Activer"}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-500 hover:text-red-700"
                              onClick={() => handleDeleteLanguage(language.id)}
                            >
                              <Trash2 size={16} />
                            </Button>
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                      Aucune langue trouvée
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="translations" className="space-y-6">
          {Object.entries(translations).map(([section, keys]) => (
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
                              />
                            </TableCell>
                          ))}
                          <TableCell className="flex justify-end space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-green-500 hover:text-green-700"
                              onClick={handleSaveTranslation}
                            >
                              <Check size={16} />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-500 hover:text-red-700"
                              onClick={handleCancelEdit}
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
