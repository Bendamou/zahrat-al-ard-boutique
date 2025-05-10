
import { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type Language = "ar";
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
  // Toujours définir la langue comme arabe
  const [currentLanguage] = useState<Language>("ar");
  const [translations, setTranslations] = useState<Translation>({});
  const [loadingTranslations, setLoadingTranslations] = useState(true);
  const { toast } = useToast();
  
  const availableLanguages: Language[] = ["ar"];
  const isRTL = true; // Toujours RTL puisque nous n'utilisons que l'arabe
  
  // Cette fonction est maintenue pour la compatibilité avec le code existant
  const setLanguage = (lang: Language) => {
    // Ne fait rien car nous n'avons qu'une seule langue
    document.documentElement.dir = "rtl";
    document.body.className = "rtl";
  };
  
  const t = (section: TranslationSection, key: string, fallback = ""): string => {
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
        .select("*")
        .eq("language_code", "ar");
      
      if (error) {
        throw error;
      }
      
      if (data) {
        const formattedTranslations: Translation = {
          ar: {}
        };
        
        data.forEach((item) => {
          if (!formattedTranslations.ar[item.section]) {
            formattedTranslations.ar[item.section] = {};
          }
          
          formattedTranslations.ar[item.section][item.key] = item.value;
        });
        
        setTranslations(formattedTranslations);
      }
    } catch (error) {
      console.error("Error loading translations:", error);
      toast({
        title: "خطأ في التحميل",
        description: "تعذر تحميل الترجمات",
        variant: "destructive",
      });
    } finally {
      setLoadingTranslations(false);
    }
  };
  
  // Initial setup - force RTL direction
  useEffect(() => {
    document.documentElement.dir = "rtl";
    document.body.className = "rtl";
    
    // Load translations from database
    refreshTranslations();
  }, []);
  
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
