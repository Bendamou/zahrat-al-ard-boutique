
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/services/productService";
import { Loader2 } from "lucide-react";

const HomeAdmin = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [formState, setFormState] = useState({
    heroTitle: "باقات ورود صناعية تدوم للأبد",
    heroSubtitle: "باقات مصنوعة يدويًا بحرفية عالية وجودة ممتازة، تبقى جميلة للأبد",
    heroImageUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    aboutTitle: "معلومات عن منتجاتنا",
    aboutContent: "جميع باقات الورد التي نقدمها مصنوعة يدويًا باستخدام ورود صناعية عالية الجودة. هذه الورود ليست طبيعية، لكنها تتميز بمظهر رائع ويمكن أن تدوم معك لسنوات طويلة، دون أن تذبل أو تتلف.",
    featuredTitle: "منتجاتنا المميزة"
  });

  // Charger les produits depuis Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        // Récupérer tous les produits
        const { data: productsData, error } = await supabase
          .from("products")
          .select(`
            *,
            images:product_images(*)
          `);

        if (error) {
          throw error;
        }

        setProducts(productsData);

        // Créer un objet pour suivre les produits mis en avant
        const featuredMap: Record<string, boolean> = {};
        productsData.forEach((product: Product) => {
          featuredMap[product.id] = product.is_featured || false;
        });
        setFeaturedProducts(featuredMap);
      } catch (error) {
        console.error("Erreur lors du chargement des produits:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les produits",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [toast]);

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Mettre à jour les paramètres du site (à implémenter plus tard)
      
      // Mettre à jour le statut de mise en avant des produits
      const updatePromises = Object.entries(featuredProducts).map(([productId, isFeatured]) => {
        return supabase
          .from("products")
          .update({ is_featured: isFeatured })
          .eq("id", productId);
      });
      
      await Promise.all(updatePromises);
      
      toast({
        title: "Modifications enregistrées",
        description: "Les modifications de la page d'accueil ont été enregistrées avec succès.",
      });
    } catch (error) {
      console.error("Erreur lors de l'enregistrement des modifications:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'enregistrer les modifications",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckboxChange = (productId: string, checked: boolean) => {
    setFeaturedProducts(prev => ({
      ...prev,
      [productId]: checked
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [id]: value
    }));
  };

  // Fonction pour récupérer l'URL de l'image principale d'un produit
  const getProductImage = (product: Product): string => {
    if (product.images && product.images.length > 0) {
      const primaryImage = product.images.find(img => img.is_primary);
      if (primaryImage) return primaryImage.image_url;
      return product.images[0].image_url;
    }
    return "https://images.unsplash.com/photo-1518495973542-4542c06a5843"; // Image par défaut
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
                value={formState.heroTitle}
                onChange={handleInputChange}
              />
            </div>
            
            <div>
              <Label htmlFor="heroSubtitle">Sous-titre</Label>
              <Input
                id="heroSubtitle"
                value={formState.heroSubtitle}
                onChange={handleInputChange}
              />
            </div>
            
            <div>
              <Label htmlFor="heroImageUrl">URL de l'image d'arrière-plan</Label>
              <Input
                id="heroImageUrl"
                value={formState.heroImageUrl}
                onChange={handleInputChange}
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
                value={formState.aboutTitle}
                onChange={handleInputChange}
              />
            </div>
            
            <div>
              <Label htmlFor="aboutContent">Contenu</Label>
              <Textarea
                id="aboutContent"
                rows={5}
                value={formState.aboutContent}
                onChange={handleInputChange}
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
                value={formState.featuredTitle}
                onChange={handleInputChange}
              />
            </div>
            
            <div>
              <Label>Produits mis en avant</Label>
              {isLoading ? (
                <div className="flex justify-center py-4">
                  <Loader2 className="h-8 w-8 animate-spin text-floral-green" />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  {products.length > 0 ? (
                    products.map((product) => (
                      <div key={product.id} className="border rounded p-3 flex items-center">
                        <div className="flex items-center space-x-3 flex-1">
                          <img 
                            src={getProductImage(product)} 
                            alt={product.name_ar}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="flex-1 overflow-hidden">
                            <p className="font-medium truncate">{product.name_ar}</p>
                            <p className="text-sm text-gray-500">{product.price} ﷼</p>
                          </div>
                        </div>
                        <Checkbox 
                          id={`product-${product.id}`}
                          checked={featuredProducts[product.id] || false}
                          onCheckedChange={(checked) => 
                            handleCheckboxChange(product.id, checked === true)
                          }
                        />
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 col-span-2 text-center py-4">
                      Aucun produit disponible.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button 
            type="submit"
            className="bg-floral-green hover:bg-floral-green/90"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enregistrement...
              </>
            ) : (
              'Enregistrer les modifications'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default HomeAdmin;
