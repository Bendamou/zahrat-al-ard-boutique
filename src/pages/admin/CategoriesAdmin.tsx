
import { useState, useEffect } from "react";
import { Edit, Trash2, Plus, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Category {
  id: string;
  name_ar: string;
  name_fr: string;
  name_en: string;
  slug: string;
  productCount: number;
}

const CategoriesAdmin = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [editingCategory, setEditingCategory] = useState<{ id: string, name: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Load categories from Supabase
  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        // Fetch categories from Supabase
        const { data: categoriesData, error: categoriesError } = await supabase
          .from("categories")
          .select("*");

        if (categoriesError) {
          throw categoriesError;
        }

        // For each category, count the number of related products
        const categoriesWithCount = await Promise.all(
          categoriesData.map(async (category) => {
            const { count: productCount, error: countError } = await supabase
              .from("product_categories")
              .select("*", { count: "exact", head: true })
              .eq("category_id", category.id);

            if (countError) {
              console.error("Error counting products:", countError);
            }

            return {
              ...category,
              productCount: productCount || 0,
            };
          })
        );

        setCategories(categoriesWithCount);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les catégories",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, [toast]);

  const handleAddCategory = async () => {
    if (!newCategory.trim()) {
      toast({
        title: "Erreur",
        description: "Le nom de la catégorie ne peut pas être vide.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Generate slug from category name
      const slug = newCategory
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();

      // Insert new category into Supabase
      const { data, error } = await supabase
        .from("categories")
        .insert({
          name_ar: newCategory,
          name_fr: newCategory, // Using same value for French
          name_en: newCategory, // Using same value for English
          slug: slug
        })
        .select();

      if (error) {
        throw error;
      }

      // Add the new category to the state with 0 products
      const newCategoryWithCount = {
        ...data[0],
        productCount: 0
      };

      setCategories([...categories, newCategoryWithCount]);
      setNewCategory("");
      
      toast({
        title: "Catégorie ajoutée",
        description: `La catégorie "${newCategory}" a été ajoutée avec succès.`
      });
    } catch (error) {
      console.error("Error adding category:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter la catégorie",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditCategory = async (id: string, newName: string) => {
    if (!newName.trim()) {
      toast({
        title: "Erreur",
        description: "Le nom de la catégorie ne peut pas être vide.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Generate slug from new name
      const slug = newName
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();

      // Update category in Supabase
      const { error } = await supabase
        .from("categories")
        .update({
          name_ar: newName,
          name_fr: newName, // Using same value for French
          name_en: newName, // Using same value for English
          slug: slug
        })
        .eq("id", id);

      if (error) {
        throw error;
      }

      // Update category in state
      setCategories(categories.map(category => 
        category.id === id ? { ...category, name_ar: newName, name_fr: newName, name_en: newName, slug } : category
      ));
      
      setEditingCategory(null);
      
      toast({
        title: "Catégorie modifiée",
        description: `La catégorie a été renommée en "${newName}" avec succès.`
      });
    } catch (error) {
      console.error("Error updating category:", error);
      toast({
        title: "Erreur",
        description: "Impossible de modifier la catégorie",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    const categoryToDelete = categories.find(c => c.id === id);
    
    if (!categoryToDelete) {
      toast({
        title: "Erreur",
        description: "Catégorie introuvable",
        variant: "destructive"
      });
      return;
    }
    
    if (categoryToDelete.productCount > 0) {
      toast({
        title: "Attention",
        description: `Cette catégorie contient ${categoryToDelete.productCount} produit(s). Les produits ne seront plus associés à cette catégorie.`,
        variant: "warning"
      });
    }
    
    setIsLoading(true);
    
    try {
      // First remove product_categories associations
      const { error: associationError } = await supabase
        .from("product_categories")
        .delete()
        .eq("category_id", id);
        
      if (associationError) {
        throw associationError;
      }
      
      // Then delete the category
      const { error } = await supabase
        .from("categories")
        .delete()
        .eq("id", id);
        
      if (error) {
        throw error;
      }
      
      // Update state
      setCategories(categories.filter(category => category.id !== id));
      
      toast({
        title: "Catégorie supprimée",
        description: "La catégorie a été supprimée avec succès."
      });
    } catch (error) {
      console.error("Error deleting category:", error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la catégorie",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
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
            disabled={isLoading}
          />
          <Button 
            onClick={handleAddCategory}
            className="bg-floral-green hover:bg-floral-green/90"
            disabled={isLoading}
          >
            <Plus className="mr-2" size={16} />
            Ajouter
          </Button>
        </div>
      </div>

      {isLoading && categories.length === 0 ? (
        <div className="flex justify-center py-12">
          <div className="w-12 h-12 border-4 border-floral-green rounded-full border-t-transparent animate-spin"></div>
        </div>
      ) : (
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
              {categories.length > 0 ? (
                categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell>
                      {editingCategory && editingCategory.id === category.id ? (
                        <Input 
                          value={editingCategory.name}
                          onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                          className="w-full"
                          autoFocus
                          disabled={isLoading}
                        />
                      ) : (
                        <div className="flex items-center">
                          <Tag size={16} className="mr-2 text-floral-green" />
                          {category.name_ar}
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
                            disabled={isLoading}
                          >
                            Enregistrer
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingCategory(null)}
                            disabled={isLoading}
                          >
                            Annuler
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingCategory({ id: category.id, name: category.name_ar })}
                            disabled={isLoading}
                          >
                            <Edit size={16} />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleDeleteCategory(category.id)}
                            disabled={isLoading}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-10 text-gray-500">
                    Aucune catégorie trouvée. Ajoutez votre première catégorie !
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default CategoriesAdmin;
