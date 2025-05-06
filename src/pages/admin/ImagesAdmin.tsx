
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Image, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Images temporaires par section
const initialImages = {
  home: [
    { id: 1, name: "Banner principal", url: "https://images.unsplash.com/photo-1518495973542-4542c06a5843" },
    { id: 2, name: "Section produits", url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb" }
  ],
  about: [
    { id: 3, name: "Notre histoire", url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e" }
  ],
  logo: [
    { id: 4, name: "Logo du site", url: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07" }
  ]
};

const ImagesAdmin = () => {
  const [images, setImages] = useState(initialImages);
  const [activeTab, setActiveTab] = useState("home");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newImageName, setNewImageName] = useState("");
  const { toast } = useToast();

  const handleAddImage = () => {
    if (!newImageUrl.trim() || !newImageName.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer un nom et une URL pour l'image",
        variant: "destructive"
      });
      return;
    }

    const newImage = {
      id: Math.max(0, ...images[activeTab as keyof typeof images].map(img => img.id)) + 1,
      name: newImageName,
      url: newImageUrl
    };

    setImages({
      ...images,
      [activeTab]: [...images[activeTab as keyof typeof images], newImage]
    });

    setNewImageUrl("");
    setNewImageName("");

    toast({
      title: "Image ajoutée",
      description: `L'image "${newImageName}" a été ajoutée avec succès`
    });
  };

  const handleDeleteImage = (id: number) => {
    const imageName = images[activeTab as keyof typeof images].find(img => img.id === id)?.name;
    
    setImages({
      ...images,
      [activeTab]: images[activeTab as keyof typeof images].filter(img => img.id !== id)
    });

    toast({
      title: "Image supprimée",
      description: `L'image "${imageName}" a été supprimée avec succès`
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des images</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="home">Page d'accueil</TabsTrigger>
          <TabsTrigger value="about">À propos</TabsTrigger>
          <TabsTrigger value="logo">Logo</TabsTrigger>
        </TabsList>

        {Object.keys(images).map((section) => (
          <TabsContent key={section} value={section} className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">Ajouter une nouvelle image</h2>
              
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <Label htmlFor="image-name">Nom de l'image</Label>
                  <Input
                    id="image-name"
                    value={newImageName}
                    onChange={(e) => setNewImageName(e.target.value)}
                    placeholder="Entrez un nom pour cette image"
                    className="mt-1"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <Label htmlFor="image-url">URL de l'image</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      id="image-url"
                      value={newImageUrl}
                      onChange={(e) => setNewImageUrl(e.target.value)}
                      placeholder="https://example.com/image.jpg"
                    />
                    <Button onClick={handleAddImage} className="bg-floral-green hover:bg-floral-green/90">
                      <Plus size={16} className="mr-2" />
                      Ajouter
                    </Button>
                  </div>
                </div>
              </div>
              
              {newImageUrl && (
                <div className="mt-4">
                  <Label>Aperçu:</Label>
                  <div className="mt-1 p-2 border rounded bg-gray-50">
                    <img 
                      src={newImageUrl} 
                      alt="Aperçu" 
                      className="h-40 object-contain mx-auto"
                      loading="lazy"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {images[section as keyof typeof images].map((image) => (
                <div key={image.id} className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="relative aspect-square overflow-hidden rounded mb-2">
                    <img 
                      src={image.url} 
                      alt={image.name} 
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{image.name}</h3>
                      <p className="text-xs text-gray-500 truncate">{image.url}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDeleteImage(image.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              ))}
              
              {images[section as keyof typeof images].length === 0 && (
                <div className="col-span-full text-center py-12 bg-gray-50 rounded-lg">
                  <Image size={48} className="mx-auto text-gray-300 mb-2" />
                  <h3 className="text-lg font-medium text-gray-500">Aucune image</h3>
                  <p className="text-sm text-gray-400">Ajoutez des images pour cette section</p>
                </div>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ImagesAdmin;
