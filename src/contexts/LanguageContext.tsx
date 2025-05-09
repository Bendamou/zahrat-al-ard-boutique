
import { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type Language = "ar" | "fr" | "en";
type TranslationSection = "common" | "product" | "pages";

interface Translation {
  [language: string]: {
    [section: string]: {
      [key: string]: string;
    };
  };
}

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  translations: Translation;
  t: (section: TranslationSection, key: string, fallback?: string) => string;
  isRTL: boolean;
  availableLanguages: Language[];
  loadingTranslations: boolean;
  refreshTranslations: () => Promise<void>;
}

const LanguageContext = createContext<LanguageContextType>({} as LanguageContextType);

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("ar");
  const [translations, setTranslations] = useState<Translation>({});
  const [loadingTranslations, setLoadingTranslations] = useState(true);
  const { toast } = useToast();
  
  const availableLanguages: Language[] = ["ar", "fr", "en"];
  const isRTL = currentLanguage === "ar";
  
  const setLanguage = (lang: Language) => {
    if (availableLanguages.includes(lang)) {
      localStorage.setItem("preferred_language", lang);
      setCurrentLanguage(lang);
      
      // Update HTML dir attribute for RTL/LTR support
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
      
      // Add a class to the body for additional styling
      document.body.className = lang === "ar" ? "rtl" : "ltr";
    }
  };
  
  const t = (section: TranslationSection, key: string, fallback = ""): string => {
    if (
      translations &&
      translations[currentLanguage] &&
      translations[currentLanguage][section] &&
      translations[currentLanguage][section][key]
    ) {
      return translations[currentLanguage][section][key];
    }
    
    // Fallback to default language if translation doesn't exist
    if (
      translations && 
      translations["ar"] && 
      translations["ar"][section] && 
      translations["ar"][section][key]
    ) {
      return translations["ar"][section][key];
    }
    
    return fallback || key;
  };
  
  const refreshTranslations = async () => {
    try {
      setLoadingTranslations(true);
      const { data, error } = await supabase
        .from("translations")
        .select("*");
      
      if (error) {
        throw error;
      }
      
      if (data) {
        // Transform the flat data into a nested structure
        const formattedTranslations: Translation = {};
        
        data.forEach((item) => {
          if (!formattedTranslations[item.language_code]) {
            formattedTranslations[item.language_code] = {};
          }
          
          if (!formattedTranslations[item.language_code][item.section]) {
            formattedTranslations[item.language_code][item.section] = {};
          }
          
          formattedTranslations[item.language_code][item.section][item.key] = item.value;
        });
        
        setTranslations(formattedTranslations);
      }
    } catch (error) {
      console.error("Error loading translations:", error);
      toast({
        title: "Erreur de chargement",
        description: "Impossible de charger les traductions",
        variant: "destructive",
      });
    } finally {
      setLoadingTranslations(false);
    }
  };
  
  // Initial setup - load language preference from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem("preferred_language") as Language;
    if (savedLanguage && availableLanguages.includes(savedLanguage)) {
      setCurrentLanguage(savedLanguage);
    }
    
    // Load translations from database
    refreshTranslations();
  }, []);
  
  // Update HTML dir whenever language changes
  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.body.className = isRTL ? "rtl" : "ltr";
  }, [isRTL]);
  
  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        setLanguage,
        translations,
        t,
        isRTL,
        availableLanguages,
        loadingTranslations,
        refreshTranslations,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
