
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

const LanguageSwitcher = () => {
  const { currentLanguage, setLanguage, availableLanguages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  
  const languageNames: Record<string, string> = {
    ar: "العربية",
    fr: "Français",
    en: "English",
  };

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang as "ar" | "fr" | "en");
    setIsOpen(false);
    
    toast({
      title: lang === "fr" ? "Langue modifiée" : 
            (lang === "en" ? "Language changed" : "تم تغيير اللغة"),
      description: lang === "fr" ? "La langue a été changée avec succès" : 
                 (lang === "en" ? "The language has been successfully changed" : "تم تغيير اللغة بنجاح"),
      duration: 2000,
    });
  };
  
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-1 px-2">
          <Globe size={18} className="mr-1" />
          <span>{languageNames[currentLanguage]}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {availableLanguages.map((lang) => (
          <DropdownMenuItem
            key={lang}
            onClick={() => handleLanguageChange(lang)}
            className={currentLanguage === lang ? "bg-muted" : ""}
          >
            {languageNames[lang]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
