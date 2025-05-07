
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, X, Plus } from "lucide-react";

interface Product {
  id?: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  images?: string[];
}

interface AddProductFormProps {
  onSubmit: (product: Product) => void;
  onCancel: () => void;
  initialData?: Product;
}

const AddProductForm = ({ onSubmit, onCancel, initialData }: AddProductFormProps) => {
  const [formData, setFormData] = useState<Product>({
    name: "",
    price: 0,
    image: "",
    category: "", // Aucune catégorie par défaut
    description: "",
    images: []
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [categories, setCategories] = useState<string[]>([]);

  // Load categories from localStorage
  useEffect(() => {
    const savedCategories = localStorage.getItem('storeCategories');
    if (savedCategories) {
      const categoryData = JSON.parse(savedCategories);
      setCategories(categoryData.map((cat: any) => cat.name));
    }
  }, []);

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        // Ensure images is always an array
        images: initialData.images || []
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
    const updatedImages = formData.images?.filter((_, i) => i !== index) || [];
    setFormData({
      ...formData,
      images: updatedImages
    });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Le nom est obligatoire";
    }
    
    if (formData.price <= 0) {
      newErrors.price = "Le prix doit être supérieur à zéro";
    }
    
    if (!formData.image.trim() && (!formData.images || formData.images.length === 0)) {
      newErrors.image = "Une image principale est requise";
    }
    
    if (!formData.description.trim()) {
      newErrors.description = "La description est obligatoire";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    // If we have an image but no images array, make sure the image is the first element of images
    let productToSubmit = { ...formData };
    if (formData.image && (!formData.images || formData.images.length === 0)) {
      productToSubmit.images = [formData.image];
    }
    
    onSubmit(productToSubmit);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center mb-4">
        <Button 
          variant="ghost" 
          size="sm" 
          className="mr-2"
          onClick={onCancel}
        >
          <ArrowLeft size={16} />
        </Button>
        <h2 className="text-xl font-semibold">
          {initialData ? "Modifier le produit" : "Ajouter un nouveau produit"}
        </h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Name Field */}
        <div>
          <Label htmlFor="name">Nom du produit</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Entrez le nom du produit"
            className={errors.name ? "border-red-500" : ""}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>
        
        {/* Category Field */}
        <div>
          <Label htmlFor="category">Catégorie (optionnelle)</Label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          >
            <option value="">-- Aucune catégorie --</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        
        {/* Price Field */}
        <div>
          <Label htmlFor="price">Prix (﷼)</Label>
          <Input
            id="price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            className={errors.price ? "border-red-500" : ""}
          />
          {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
        </div>
        
        {/* Image Field with Preview */}
        <div>
          <Label htmlFor="image">Image principale</Label>
          <div className="flex gap-2">
            <Input
              id="image"
              name="image"
              value={formData.image}
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
              {formData.images.map((img, index) => (
                <div key={index} className="relative group">
                  <img
                    src={img}
                    alt={`Image ${index + 1}`}
                    className="w-full h-24 object-cover border rounded"
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
            />
          </div>
        )}
        
        {/* Description Field */}
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Entrez une description du produit..."
            rows={4}
            className={errors.description ? "border-red-500" : ""}
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>
        
        {/* Form Actions */}
        <div className="flex justify-end space-x-3 pt-3">
          <Button variant="outline" onClick={onCancel}>
            Annuler
          </Button>
          <Button type="submit" className="bg-floral-green hover:bg-floral-green/90">
            {initialData ? "Mettre à jour" : "Ajouter"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
