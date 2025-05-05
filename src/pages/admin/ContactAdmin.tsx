
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";

const ContactAdmin = () => {
  const { toast } = useToast();

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Modifications enregistrées",
      description: "Les informations de contact ont été mises à jour avec succès.",
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Gestion des informations de contact</h1>

      <form onSubmit={handleSaveChanges} className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Informations de contact</h2>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="whatsappNumber">Numéro WhatsApp</Label>
              <Input
                id="whatsappNumber"
                defaultValue="+123456789"
                placeholder="+XXXXXXXXX"
              />
              <p className="text-sm text-gray-500 mt-1">Ce numéro sera utilisé pour les boutons WhatsApp sur tout le site</p>
            </div>
            
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                defaultValue="contact@zahrat-alard.com"
                placeholder="email@example.com"
              />
            </div>
            
            <div>
              <Label htmlFor="address">Adresse</Label>
              <Input
                id="address"
                defaultValue="الرياض، المملكة العربية السعودية"
                placeholder="Entrez votre adresse"
              />
            </div>
            
            <div>
              <Label htmlFor="instagram">Instagram</Label>
              <Input
                id="instagram"
                defaultValue="zahrat_alard"
                placeholder="Nom d'utilisateur Instagram"
              />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Heures d'ouverture</h2>
          
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="sunday">Dimanche</Label>
                <Input id="sunday" defaultValue="9:00 - 21:00" />
              </div>
              <div>
                <Label htmlFor="monday">Lundi</Label>
                <Input id="monday" defaultValue="9:00 - 21:00" />
              </div>
              <div>
                <Label htmlFor="tuesday">Mardi</Label>
                <Input id="tuesday" defaultValue="9:00 - 21:00" />
              </div>
              <div>
                <Label htmlFor="wednesday">Mercredi</Label>
                <Input id="wednesday" defaultValue="9:00 - 21:00" />
              </div>
              <div>
                <Label htmlFor="thursday">Jeudi</Label>
                <Input id="thursday" defaultValue="9:00 - 21:00" />
              </div>
              <div>
                <Label htmlFor="friday">Vendredi</Label>
                <Input id="friday" defaultValue="14:00 - 21:00" />
              </div>
              <div>
                <Label htmlFor="saturday">Samedi</Label>
                <Input id="saturday" defaultValue="9:00 - 21:00" />
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

export default ContactAdmin;
