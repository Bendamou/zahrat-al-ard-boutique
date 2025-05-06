
import { useState, useEffect } from "react";
import { Edit, Trash2, Plus, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

// Données temporaires
const initialCategories = [
  { id: 1, name: "باقات", productCount: 3 },
  { id: 2, name: "نباتات", productCount: 2 },
  { id: 3, name: "هدايا", productCount: 1 }
];

const CategoriesAdmin = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [newCategory, setNewCategory] = useState("");
  const [editingCategory, setEditingCategory] = useState<{ id: number, name: string } | null>(null);
  const { toast } = useToast();

  // Load categories from localStorage on component mount
  useEffect(() => {
    const savedCategories = localStorage.getItem('storeCategories');
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    } else {
      // Initialize localStorage with default categories
      localStorage.setItem('storeCategories', JSON.stringify(initialCategories));
    }
  }, []);

  // Update product counts
  useEffect(() => {
    const countProductsByCategory = () => {
      const savedProducts = localStorage.getItem('storeProducts');
      if (!savedProducts) return;
      
      const products = JSON.parse(savedProducts);
      const updatedCategories = categories.map(category => {
        const count = products.filter((product: any) => product.category === category.name).length;
        return { ...category, productCount: count };
      });
      
      setCategories(updatedCategories);
      localStorage.setItem('storeCategories', JSON.stringify(updatedCategories));
    };
    
    countProductsByCategory();
  }, []);

  const handleAddCategory = () => {
    if (!newCategory.trim()) {
      toast({
        title: "Erreur",
        description: "Le nom de la catégorie ne peut pas être vide.",
        variant: "destructive"
      });
      return;
    }

    const newId = Math.max(0, ...categories.map(c => c.id)) + 1;
    const updatedCategories = [...categories, { id: newId, name: newCategory, productCount: 0 }];
    setCategories(updatedCategories);
    localStorage.setItem('storeCategories', JSON.stringify(updatedCategories));
    setNewCategory("");
    
    toast({
      title: "Catégorie ajoutée",
      description: `La catégorie "${newCategory}" a été ajoutée avec succès.`
    });
  };

  const handleEditCategory = (id: number, newName: string) => {
    if (!newName.trim()) {
      toast({
        title: "Erreur",
        description: "Le nom de la catégorie ne peut pas être vide.",
        variant: "destructive"
      });
      return;
    }

    // Get old name to update products
    const oldName = categories.find(c => c.id === id)?.name;
    const updatedCategories = categories.map(category => 
      category.id === id ? { ...category, name: newName } : category
    );
    
    setCategories(updatedCategories);
    localStorage.setItem('storeCategories', JSON.stringify(updatedCategories));
    
    // Update category name in products
    if (oldName) {
      const savedProducts = localStorage.getItem('storeProducts');
      if (savedProducts) {
        const products = JSON.parse(savedProducts);
        const updatedProducts = products.map((product: any) => 
          product.category === oldName ? { ...product, category: newName } : product
        );
        localStorage.setItem('storeProducts', JSON.stringify(updatedProducts));
      }
    }
    
    setEditingCategory(null);
    
    toast({
      title: "Catégorie modifiée",
      description: `La catégorie a été renommée en "${newName}" avec succès.`
    });
  };

  const handleDeleteCategory = (id: number) => {
    const categoryToDelete = categories.find(c => c.id === id);
    
    if (categoryToDelete && categoryToDelete.productCount > 0) {
      toast({
        title: "Attention",
        description: `Cette catégorie contient ${categoryToDelete.productCount} produit(s). Les produits ne seront plus associés à cette catégorie.`,
        variant: "destructive"
      });
      
      // Remove category from products
      const savedProducts = localStorage.getItem('storeProducts');
      if (savedProducts) {
        const products = JSON.parse(savedProducts);
        const updatedProducts = products.map((product: any) => 
          product.category === categoryToDelete.name ? { ...product, category: "" } : product
        );
        localStorage.setItem('storeProducts', JSON.stringify(updatedProducts));
      }
    }
    
    const updatedCategories = categories.filter(category => category.id !== id);
    setCategories(updatedCategories);
    localStorage.setItem('storeCategories', JSON.stringify(updatedCategories));
    
    toast({
      title: "Catégorie supprimée",
      description: "La catégorie a été supprimée avec succès."
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des catégories</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Ajouter une nouvelle catégorie</h2>
        
        <div className="flex gap-2">
          <Input 
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Nom de la catégorie"
            className="flex-1"
          />
          <Button 
            onClick={handleAddCategory}
            className="bg-floral-green hover:bg-floral-green/90"
          >
            <Plus className="mr-2" size={16} />
            Ajouter
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Nombre de produits</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>
                  {editingCategory && editingCategory.id === category.id ? (
                    <Input 
                      value={editingCategory.name}
                      onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                      className="w-full"
                      autoFocus
                    />
                  ) : (
                    <div className="flex items-center">
                      <Tag size={16} className="mr-2 text-floral-green" />
                      {category.name}
                    </div>
                  )}
                </TableCell>
                <TableCell>{category.productCount}</TableCell>
                <TableCell className="flex justify-end space-x-2">
                  {editingCategory && editingCategory.id === category.id ? (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditCategory(category.id, editingCategory.name)}
                      >
                        Enregistrer
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingCategory(null)}
                      >
                        Annuler
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingCategory({ id: category.id, name: category.name })}
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDeleteCategory(category.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CategoriesAdmin;
