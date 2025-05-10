
import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription 
} from "@/components/ui/dialog";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle 
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Plus, Pencil, Trash2 } from "lucide-react";

const CategoriesAdmin = () => {
  const { toast } = useToast();
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    name_ar: "",
    name_fr: "",
    name_en: "",
    slug: ""
  });

  // Charger les catégories
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("categories")
        .select("*");

      if (error) throw error;

      setCategories(data || []);
    } catch (error) {
      console.error("Erreur lors du chargement des catégories:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les catégories",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Générer un slug à partir du nom
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value,
      ...(id === "name_ar" ? { slug: generateSlug(value) } : {})
    }));
  };

  const handleAddClick = () => {
    setSelectedCategory(null);
    setFormData({
      name_ar: "",
      name_fr: "",
      name_en: "",
      slug: ""
    });
    setIsDialogOpen(true);
  };

  const handleEditClick = (category: any) => {
    setSelectedCategory(category);
    setFormData({
      name_ar: category.name_ar || "",
      name_fr: category.name_fr || "",
      name_en: category.name_en || "",
      slug: category.slug || ""
    });
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (category: any) => {
    setSelectedCategory(category);
    setIsDeleteDialogOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (selectedCategory) {
        // Mode édition
        const { error } = await supabase
          .from("categories")
          .update({
            name_ar: formData.name_ar,
            name_fr: formData.name_fr,
            name_en: formData.name_en,
            slug: formData.slug
          })
          .eq("id", selectedCategory.id);

        if (error) throw error;

        toast({
          title: "Catégorie mise à jour",
          description: `La catégorie ${formData.name_ar} a été mise à jour avec succès.`,
        });
      } else {
        // Mode ajout
        const { error } = await supabase
          .from("categories")
          .insert({
            name_ar: formData.name_ar,
            name_fr: formData.name_fr,
            name_en: formData.name_en,
            slug: formData.slug
          });

        if (error) throw error;

        toast({
          title: "Catégorie ajoutée",
          description: `La catégorie ${formData.name_ar} a été ajoutée avec succès.`,
        });
      }

      await fetchCategories();
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Erreur lors de l'enregistrement de la catégorie:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'enregistrer la catégorie",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedCategory) return;
    setIsLoading(true);

    try {
      // Vérifie si des produits sont attachés à cette catégorie
      const { count, error: countError } = await supabase
        .from("product_categories")
        .select("*", { count: "exact", head: true })
        .eq("category_id", selectedCategory.id);

      if (countError) throw countError;

      if (count && count > 0) {
        toast({
          title: "Suppression impossible",
          description: `Il y a ${count} produit(s) associé(s) à cette catégorie. Veuillez d'abord les dissocier.`,
          variant: "destructive",
        });
        setIsDeleteDialogOpen(false);
        setIsLoading(false);
        return;
      }

      const { error } = await supabase
        .from("categories")
        .delete()
        .eq("id", selectedCategory.id);

      if (error) throw error;

      toast({
        title: "Catégorie supprimée",
        description: `La catégorie ${selectedCategory.name_ar} a été supprimée avec succès.`,
      });

      await fetchCategories();
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Erreur lors de la suppression de la catégorie:", error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la catégorie",
        variant: "destructive", 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des catégories</h1>
        <Button 
          onClick={handleAddClick} 
          className="bg-floral-green hover:bg-floral-green/90"
        >
          <Plus className="mr-2" size={16} /> Ajouter une catégorie
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        {isLoading && categories.length === 0 ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-floral-green" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom (AR)</TableHead>
                <TableHead>Nom (FR)</TableHead>
                <TableHead>Nom (EN)</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.length > 0 ? (
                categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium">{category.name_ar}</TableCell>
                    <TableCell>{category.name_fr || "-"}</TableCell>
                    <TableCell>{category.name_en || "-"}</TableCell>
                    <TableCell>{category.slug}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditClick(category)}
                        >
                          <Pencil size={16} />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteClick(category)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                    Aucune catégorie trouvée
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Dialog pour ajouter/éditer une catégorie */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedCategory ? "Modifier la catégorie" : "Ajouter une catégorie"}
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleFormSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name_ar">Nom en arabe (AR)</Label>
                <Input
                  id="name_ar"
                  value={formData.name_ar}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="name_fr">Nom en français (FR)</Label>
                <Input
                  id="name_fr"
                  value={formData.name_fr}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="name_en">Nom en anglais (EN)</Label>
                <Input
                  id="name_en"
                  value={formData.name_en}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {selectedCategory ? "Mise à jour..." : "Ajout..."}
                  </>
                ) : (
                  selectedCategory ? "Mettre à jour" : "Ajouter"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Dialog de confirmation de suppression */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. La catégorie {selectedCategory?.name_ar} sera définitivement supprimée.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isLoading}
              className="bg-red-500 hover:bg-red-600"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Suppression...
                </>
              ) : (
                "Supprimer"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CategoriesAdmin;
