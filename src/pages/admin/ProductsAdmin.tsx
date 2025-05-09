
import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import AddProductForm from "@/components/admin/AddProductForm";
import ProductsList from "@/components/admin/ProductsList";
import ProductSearch from "@/components/admin/ProductSearch";
import { getAllProducts, deleteProduct, Product, ProductImage } from "@/services/productService";
import { supabase } from "@/integrations/supabase/client";

const ProductsAdmin = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Fetch products from the database
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const productsData = await getAllProducts();
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
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

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.name_ar.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (product.name_fr && product.name_fr.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (product.name_en && product.name_en.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleAddProduct = async (newProduct: any) => {
    setIsLoading(true);
    
    try {
      // Insert the product
      const { data: productData, error: productError } = await supabase
        .from("products")
        .insert({
          name_ar: newProduct.name_ar || "",
          name_fr: newProduct.name_fr || null,
          name_en: newProduct.name_en || null,
          description_ar: newProduct.description_ar || null,
          description_fr: newProduct.description_fr || null,
          description_en: newProduct.description_en || null,
          price: newProduct.price,
          slug: newProduct.slug || generateSlug(newProduct.name_ar || ""),
          is_available: true,
          is_featured: newProduct.is_featured || false
        })
        .select()
        .single();
        
      if (productError) {
        console.error("Error adding product:", productError);
        throw productError;
      }
      
      // Add product image if provided
      if (newProduct.images && newProduct.images.length > 0) {
        const imagePromises = newProduct.images.map((image: string | ProductImage, index: number) => {
          return supabase
            .from("product_images")
            .insert({
              product_id: productData.id,
              image_url: typeof image === 'string' ? image : image.image_url,
              is_primary: index === 0 // First image is primary by default
            });
        });
        
        await Promise.all(imagePromises);
      }
      
      // Add category if provided
      if (newProduct.category) {
        await supabase
          .from("product_categories")
          .insert({
            product_id: productData.id,
            category_id: newProduct.category
          });
      } else if (newProduct.categories && newProduct.categories.length > 0) {
        // For backward compatibility
        await supabase
          .from("product_categories")
          .insert({
            product_id: productData.id,
            category_id: newProduct.categories[0].id
          });
      }
      
      toast({
        title: "Produit ajouté",
        description: `${newProduct.name_ar} a été ajouté avec succès.`,
      });
      
      // Refresh products list
      const updatedProducts = await getAllProducts();
      setProducts(updatedProducts);
      
      setShowAddForm(false);
    } catch (error) {
      console.error("Error adding product:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter le produit",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProduct = async (updatedProduct: any) => {
    setIsLoading(true);
    
    try {
      // Update the product
      const { error: productError } = await supabase
        .from("products")
        .update({
          name_ar: updatedProduct.name_ar || "",
          name_fr: updatedProduct.name_fr || null,
          name_en: updatedProduct.name_en || null,
          description_ar: updatedProduct.description_ar || null,
          description_fr: updatedProduct.description_fr || null,
          description_en: updatedProduct.description_en || null,
          price: updatedProduct.price,
          slug: updatedProduct.slug || generateSlug(updatedProduct.name_ar || ""),
          is_available: updatedProduct.is_available !== undefined ? updatedProduct.is_available : true,
          is_featured: updatedProduct.is_featured !== undefined ? updatedProduct.is_featured : false
        })
        .eq("id", updatedProduct.id);
        
      if (productError) {
        throw productError;
      }
      
      // Update images if provided
      if (updatedProduct.images && updatedProduct.images.length > 0) {
        // First remove existing images
        await supabase
          .from("product_images")
          .delete()
          .eq("product_id", updatedProduct.id);
          
        // Then add new images
        const imagePromises = updatedProduct.images.map((image: string | ProductImage, index: number) => {
          return supabase
            .from("product_images")
            .insert({
              product_id: updatedProduct.id,
              image_url: typeof image === 'string' ? image : image.image_url,
              is_primary: index === 0 // First image is primary by default
            });
        });
        
        await Promise.all(imagePromises);
      }
      
      // Update category
      // First remove existing category associations
      await supabase
        .from("product_categories")
        .delete()
        .eq("product_id", updatedProduct.id);
        
      // Then add new category if provided
      if (updatedProduct.category) {
        await supabase
          .from("product_categories")
          .insert({
            product_id: updatedProduct.id,
            category_id: updatedProduct.category
          });
      } else if (updatedProduct.categories && updatedProduct.categories.length > 0) {
        // For backward compatibility
        await supabase
          .from("product_categories")
          .insert({
            product_id: updatedProduct.id,
            category_id: updatedProduct.categories[0].id
          });
      }
      
      toast({
        title: "Produit mis à jour",
        description: `${updatedProduct.name_ar} a été mis à jour avec succès.`,
      });
      
      // Refresh products list
      const updatedProducts = await getAllProducts();
      setProducts(updatedProducts);
      
      setEditingProduct(null);
      setShowAddForm(false);
    } catch (error) {
      console.error("Error updating product:", error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le produit",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    setIsLoading(true);
    
    try {
      const productName = products.find(p => p.id === id)?.name_ar;
      const success = await deleteProduct(id);
      
      if (!success) {
        throw new Error("Failed to delete product");
      }
      
      toast({
        title: "Produit supprimé",
        description: `${productName} a été supprimé avec succès.`,
      });
      
      // Update local state
      setProducts(products.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le produit",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setShowAddForm(true);
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

  // Function to toggle featured status
  const handleToggleFeatured = async (product: Product) => {
    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from("products")
        .update({ is_featured: !product.is_featured })
        .eq("id", product.id);
        
      if (error) {
        throw error;
      }
      
      toast({
        title: product.is_featured ? "Produit retiré de la mise en avant" : "Produit mis en avant",
        description: `${product.name_ar} a été ${product.is_featured ? "retiré de" : "ajouté à"} la mise en avant.`,
      });
      
      // Update local state
      setProducts(products.map(p => 
        p.id === product.id 
          ? { ...p, is_featured: !p.is_featured } 
          : p
      ));
    } catch (error) {
      console.error("Error toggling featured status:", error);
      toast({
        title: "Erreur",
        description: "Impossible de modifier le statut de mise en avant",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des produits</h1>
        <Button 
          onClick={() => {
            setEditingProduct(null);
            setShowAddForm(true);
          }}
          className="bg-floral-green hover:bg-floral-green/90"
          disabled={isLoading}
        >
          <Plus className="mr-2" size={16} /> Ajouter un produit
        </Button>
      </div>

      {showAddForm ? (
        <AddProductForm
          onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
          onCancel={() => {
            setShowAddForm(false);
            setEditingProduct(null);
          }}
          initialData={editingProduct || undefined}
          isLoading={isLoading}
        />
      ) : (
        <>
          <ProductSearch 
            searchQuery={searchQuery} 
            onSearchChange={setSearchQuery} 
          />
          {isLoading && products.length === 0 ? (
            <div className="flex justify-center py-12">
              <div className="w-12 h-12 border-4 border-floral-green rounded-full border-t-transparent animate-spin"></div>
            </div>
          ) : (
            <ProductsList 
              products={filteredProducts} 
              onEditProduct={handleEditClick} 
              onDeleteProduct={handleDeleteProduct}
              onToggleFeatured={handleToggleFeatured} 
            />
          )}
        </>
      )}
    </div>
  );
};

export default ProductsAdmin;
