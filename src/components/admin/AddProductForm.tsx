
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, X, Plus } from "lucide-react";
import { Product, Category } from "@/services/productService";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AddProductFormProps {
  onSubmit: (product: any) => void;
  onCancel: () => void;
  initialData?: any;
  isLoading?: boolean;
}

const AddProductForm = ({ onSubmit, onCancel, initialData, isLoading = false }: AddProductFormProps) => {
  const [formData, setFormData] = useState<any>({
    name_ar: "",
    name_fr: "",
    name_en: "",
    price: 0,
    image: "",
    category: "",
    description_ar: "",
    description_fr: "",
    description_en: "",
    images: [],
    categories: []
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [categories, setCategories] = useState<Category[]>([]);
  const { toast } = useToast();

  // Load categories from Supabase
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from("categories")
          .select("*");
        
        if (error) {
          throw error;
        }
        
        if (data) {
          setCategories(data);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des catégories:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les catégories",
          variant: "destructive",
        });
      }
    };
    
    fetchCategories();
  }, [toast]);

  useEffect(() => {
    if (initialData) {
      // Convertir les images en tableau s'il s'agit d'objets
      const processedImages = initialData.images?.map((img: any) => 
        typeof img === 'string' ? img : img.image_url
      ) || [];
      
      setFormData({
        ...initialData,
        // Ensure images is always an array of strings
        images: processedImages,
        // Ensure category is set if there are categories
        category: initialData.categories && initialData.categories.length > 0 
          ? initialData.categories[0].id 
          : ""
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    });
    
    // Effacer l'erreur pour ce champ s'il y en avait une
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleAddImage = () => {
    if (!formData.image) {
      setErrors({
        ...errors,
        image: "Veuillez entrer une URL d'image"
      });
      return;
    }
    
    // Add the current image to the images array
    const updatedImages = [...(formData.images || []), formData.image];
    
    setFormData({
      ...formData,
      images: updatedImages,
      image: "" // Clear the input field
    });
    
    // Clear any error
    setErrors({
      ...errors,
      image: ""
    });
  };
  
  const handleRemoveImage = (index: number) => {
    const updatedImages = formData.images?.filter((_, i: number) => i !== index) || [];
    setFormData({
      ...formData,
      images: updatedImages
    });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name_ar?.trim()) {
      newErrors.name_ar = "Le nom en arabe est obligatoire";
    }
    
    if (formData.price <= 0) {
      newErrors.price = "Le prix doit être supérieur à zéro";
    }
    
    if (!formData.description_ar?.trim()) {
      newErrors.description_ar = "La description en arabe est obligatoire";
    }
    
    // Check if we have an image in the input or in the images array
    const hasImage = formData.image?.trim() || (formData.images && formData.images.length > 0);
    if (!hasImage) {
      newErrors.image = "Une image est requise";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    // Prepare product data for submission
    let productToSubmit = { ...formData };
    
    // If we have an image but no images array, make sure the image is added to images
    if (formData.image && (!formData.images || formData.images.length === 0)) {
      productToSubmit.images = [formData.image];
    }
    
    // If category is selected, prepare it for the categories array
    if (formData.category) {
      const selectedCategory = categories.find(cat => cat.id === formData.category);
      if (selectedCategory) {
        productToSubmit.categories = [selectedCategory];
      }
    }
    
    // Generate a slug if not provided
    if (!productToSubmit.slug) {
      productToSubmit.slug = generateSlug(productToSubmit.name_ar || "");
    }
    
    try {
      onSubmit(productToSubmit);
    } catch (error) {
      console.error("Erreur lors de la soumission du produit:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter le produit",
        variant: "destructive"
      });
    }
  };

  // Helper function to generate a slug from a name
  const generateSlug = (name: string): string => {
    return name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with a single one
      .trim();
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center mb-4">
        <Button 
          variant="ghost" 
          size="sm" 
          className="mr-2"
          onClick={onCancel}
          disabled={isLoading}
        >
          <ArrowLeft size={16} />
        </Button>
        <h2 className="text-xl font-semibold">
          {initialData ? "Modifier le produit" : "Ajouter un nouveau produit"}
        </h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Name Fields */}
        <div>
          <Label htmlFor="name_ar">Nom du produit (Arabe) *</Label>
          <Input
            id="name_ar"
            name="name_ar"
            value={formData.name_ar || ""}
            onChange={handleChange}
            placeholder="أدخل اسم المنتج"
            className={errors.name_ar ? "border-red-500" : ""}
            dir="rtl"
          />
          {errors.name_ar && <p className="text-red-500 text-sm mt-1">{errors.name_ar}</p>}
        </div>

        <div>
          <Label htmlFor="name_fr">Nom du produit (Français)</Label>
          <Input
            id="name_fr"
            name="name_fr"
            value={formData.name_fr || ""}
            onChange={handleChange}
            placeholder="Entrez le nom du produit"
          />
        </div>

        <div>
          <Label htmlFor="name_en">Nom du produit (Anglais)</Label>
          <Input
            id="name_en"
            name="name_en"
            value={formData.name_en || ""}
            onChange={handleChange}
            placeholder="Enter product name"
          />
        </div>
        
        {/* Category Field */}
        <div>
          <Label htmlFor="category">Catégorie</Label>
          <select
            id="category"
            name="category"
            value={formData.category || ""}
            onChange={handleChange}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          >
            <option value="">-- Aucune catégorie --</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name_ar}
              </option>
            ))}
          </select>
        </div>
        
        {/* Price Field */}
        <div>
          <Label htmlFor="price">Prix (﷼) *</Label>
          <Input
            id="price"
            name="price"
            type="number"
            value={formData.price || 0}
            onChange={handleChange}
            min="0"
            step="0.01"
            className={errors.price ? "border-red-500" : ""}
          />
          {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
        </div>
        
        {/* Image Field with Preview */}
        <div>
          <Label htmlFor="image">Image</Label>
          <div className="flex gap-2">
            <Input
              id="image"
              name="image"
              value={formData.image || ""}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className={errors.image ? "border-red-500" : ""}
            />
            <Button 
              type="button" 
              variant="outline"
              onClick={handleAddImage}
              disabled={!formData.image}
            >
              <Plus size={16} />
            </Button>
          </div>
          {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
        </div>

        {/* Additional Images Gallery */}
        {(formData.images && formData.images.length > 0) && (
          <div>
            <Label>Images du produit</Label>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {formData.images.map((img: string, index: number) => (
                <div key={index} className="relative group">
                  <img
                    src={img}
                    alt={`Image ${index + 1}`}
                    className="w-full h-24 object-cover border rounded"
                    loading="lazy"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Preview for current image */}
        {formData.image && (
          <div className="mt-2">
            <p className="text-sm text-gray-500 mb-1">Aperçu:</p>
            <img
              src={formData.image}
              alt="Aperçu"
              className="w-40 h-40 object-cover border rounded"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg";
                setErrors({
                  ...errors,
                  image: "L'URL de l'image est invalide"
                });
              }}
            />
          </div>
        )}
        
        {/* Description Fields */}
        <div>
          <Label htmlFor="description_ar">Description (Arabe) *</Label>
          <Textarea
            id="description_ar"
            name="description_ar"
            value={formData.description_ar || ""}
            onChange={handleChange}
            placeholder="أدخل وصف المنتج..."
            rows={4}
            className={errors.description_ar ? "border-red-500" : ""}
            dir="rtl"
          />
          {errors.description_ar && <p className="text-red-500 text-sm mt-1">{errors.description_ar}</p>}
        </div>

        <div>
          <Label htmlFor="description_fr">Description (Français)</Label>
          <Textarea
            id="description_fr"
            name="description_fr"
            value={formData.description_fr || ""}
            onChange={handleChange}
            placeholder="Entrez une description du produit..."
            rows={4}
          />
        </div>

        <div>
          <Label htmlFor="description_en">Description (Anglais)</Label>
          <Textarea
            id="description_en"
            name="description_en"
            value={formData.description_en || ""}
            onChange={handleChange}
            placeholder="Enter product description..."
            rows={4}
          />
        </div>
        
        {/* Form Actions */}
        <div className="flex justify-end space-x-3 pt-3">
          <Button variant="outline" onClick={onCancel} disabled={isLoading}>
            Annuler
          </Button>
          <Button type="submit" className="bg-floral-green hover:bg-floral-green/90" disabled={isLoading}>
            {initialData ? "Mettre à jour" : "Ajouter"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
