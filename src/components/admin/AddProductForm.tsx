
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";

// Catégories disponibles
const categories = ["باقات", "نباتات", "هدايا"];

interface Product {
  id?: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
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
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
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

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Le nom est obligatoire";
    }
    
    if (formData.price <= 0) {
      newErrors.price = "Le prix doit être supérieur à zéro";
    }
    
    if (!formData.image.trim()) {
      newErrors.image = "L'URL de l'image est obligatoire";
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
    
    onSubmit({
      ...formData,
      id: initialData?.id,
    });
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
        
        <div>
          <Label htmlFor="image">URL de l'image</Label>
          <Input
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            className={errors.image ? "border-red-500" : ""}
          />
          {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
          
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
        </div>
        
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
