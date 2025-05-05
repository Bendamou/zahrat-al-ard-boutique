
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";

const HomeAdmin = () => {
  const { toast } = useToast();

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Modifications enregistrées",
      description: "Les modifications de la page d'accueil ont été enregistrées avec succès.",
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Gestion de la page d'accueil</h1>

      <form onSubmit={handleSaveChanges} className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Section Héro</h2>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="heroTitle">Titre principal</Label>
              <Input
                id="heroTitle"
                defaultValue="باقات ورود صناعية تدوم للأبد"
              />
            </div>
            
            <div>
              <Label htmlFor="heroSubtitle">Sous-titre</Label>
              <Input
                id="heroSubtitle"
                defaultValue="باقات مصنوعة يدويًا بحرفية عالية وجودة ممتازة، تبقى جميلة للأبد"
              />
            </div>
            
            <div>
              <Label htmlFor="heroImageUrl">URL de l'image d'arrière-plan</Label>
              <Input
                id="heroImageUrl"
                defaultValue="https://images.unsplash.com/photo-1469474968028-56623f02e42e"
              />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Section à propos</h2>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="aboutTitle">Titre de la section</Label>
              <Input
                id="aboutTitle"
                defaultValue="معلومات عن منتجاتنا"
              />
            </div>
            
            <div>
              <Label htmlFor="aboutContent">Contenu</Label>
              <Textarea
                id="aboutContent"
                rows={5}
                defaultValue="جميع باقات الورد التي نقدمها مصنوعة يدويًا باستخدام ورود صناعية عالية الجودة. هذه الورود ليست طبيعية، لكنها تتميز بمظهر رائع ويمكن أن تدوم معك لسنوات طويلة، دون أن تذبل أو تتلف."
              />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Mise en avant des produits</h2>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="featuredTitle">Titre de la section</Label>
              <Input
                id="featuredTitle"
                defaultValue="منتجاتنا المميزة"
              />
            </div>
            
            <div>
              <Label>Produits mis en avant</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div className="border rounded p-3 flex items-center">
                  <input type="checkbox" id="product1" className="mr-2" defaultChecked />
                  <label htmlFor="product1" className="flex-1">باقة الربيع</label>
                </div>
                <div className="border rounded p-3 flex items-center">
                  <input type="checkbox" id="product2" className="mr-2" defaultChecked />
                  <label htmlFor="product2" className="flex-1">نبتة المنزل</label>
                </div>
                <div className="border rounded p-3 flex items-center">
                  <input type="checkbox" id="product3" className="mr-2" defaultChecked />
                  <label htmlFor="product3" className="flex-1">باقة الفرح</label>
                </div>
                <div className="border rounded p-3 flex items-center">
                  <input type="checkbox" id="product4" className="mr-2" defaultChecked />
                  <label htmlFor="product4" className="flex-1">هدية مميزة</label>
                </div>
              </div>
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

export default HomeAdmin;
