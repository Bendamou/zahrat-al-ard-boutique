
import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";

const AboutAdmin = () => {
  const { toast } = useToast();

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Modifications enregistrées",
      description: "Les modifications de la page À propos ont été enregistrées avec succès.",
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Gestion de la page À propos</h1>

      <form onSubmit={handleSaveChanges} className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Informations principales</h2>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="pageTitle">Titre de la page</Label>
              <Input
                id="pageTitle"
                defaultValue="من نحن | زهرة الأرض"
              />
            </div>
            
            <div>
              <Label htmlFor="mainHeading">Titre principal</Label>
              <Input
                id="mainHeading"
                defaultValue="من نحن"
              />
            </div>
            
            <div>
              <Label htmlFor="mainContent">Contenu principal</Label>
              <Textarea
                id="mainContent"
                rows={6}
                defaultValue="نحن متخصصون في صناعة باقات الورود الصناعية المميزة التي تدوم للأبد. تأسست شركتنا عام 2018 بهدف تقديم بديل جميل ودائم للورود الطبيعية التي سرعان ما تذبل. نحن نؤمن بأن جمال الزهور يجب أن يكون دائمًا، لذلك نقدم باقات فريدة مصنوعة يدويًا من أجود أنواع الورود الصناعية عالية الجودة."
              />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Notre vision</h2>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="visionTitle">Titre</Label>
              <Input
                id="visionTitle"
                defaultValue="رؤيتنا"
              />
            </div>
            
            <div>
              <Label htmlFor="visionContent">Contenu</Label>
              <Textarea
                id="visionContent"
                rows={4}
                defaultValue="نطمح أن نكون الخيار الأول في تقديم هدايا الورود الصناعية المميزة والفريدة التي تدوم طويلاً، وأن نساهم في نشر الفرح والجمال من خلال تصاميمنا المبتكرة."
              />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Notre équipe</h2>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="teamTitle">Titre</Label>
              <Input
                id="teamTitle"
                defaultValue="فريقنا"
              />
            </div>
            
            <div>
              <Label htmlFor="teamContent">Contenu</Label>
              <Textarea
                id="teamContent"
                rows={4}
                defaultValue="يتكون فريقنا من مجموعة من الفنانين والحرفيين المهرة المتخصصين في تصميم وتنفيذ باقات الورود الصناعية بأعلى معايير الجودة والإتقان. يعمل فريقنا بشغف لابتكار تصاميم فريدة تناسب مختلف المناسبات والأذواق."
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button 
            type="submit"
            className="bg-floral-green hover:bg-floral-green/90"
          >
            Enregistrer les modifications
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AboutAdmin;
