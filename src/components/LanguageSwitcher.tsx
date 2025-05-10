
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

const LanguageSwitcher = () => {
  const { currentLanguage } = useLanguage();
  
  return (
    <Button variant="ghost" size="sm" className="flex items-center gap-1 px-2">
      <Globe size={18} className="mr-1" />
      <span>العربية</span>
    </Button>
  );
};

export default LanguageSwitcher;
