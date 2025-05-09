
import { supabase } from "@/integrations/supabase/client";

export interface Product {
  id: string;
  name_ar: string;
  name_fr?: string;
  name_en?: string;
  description_ar?: string;
  description_fr?: string;
  description_en?: string;
  price: number;
  slug: string;
  is_available: boolean;
  is_featured: boolean;
  colors?: any;
  customization_options?: any;
  created_at?: string;
  images?: ProductImage[];
  categories?: Category[];
}

export interface ProductImage {
  id: string;
  product_id: string;
  image_url: string;
  is_primary: boolean;
}

export interface Category {
  id: string;
  name_ar: string;
  name_fr: string;
  name_en: string;
  slug: string;
}

export const getAllProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      categories:product_categories(
        category:categories(*)
      ),
      images:product_images(*)
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }

  // Transform data to flatten the structure
  return data.map(product => {
    // Extract categories from the nested structure
    const categories = product.categories?.map(pc => pc.category) || [];
    
    return {
      ...product,
      categories,
      images: product.images || []
    };
  });
};

export const getFeaturedProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      categories:product_categories(
        category:categories(*)
      ),
      images:product_images(*)
    `)
    .eq("is_featured", true)
    .eq("is_available", true);

  if (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }

  // Transform data to flatten the structure
  return data.map(product => {
    // Extract categories from the nested structure
    const categories = product.categories?.map(pc => pc.category) || [];
    
    return {
      ...product,
      categories,
      images: product.images || []
    };
  });
};

export const updateProductFeaturedStatus = async (productId: string, isFeatured: boolean): Promise<boolean> => {
  const { error } = await supabase
    .from("products")
    .update({ is_featured: isFeatured })
    .eq("id", productId);

  if (error) {
    console.error("Error updating product featured status:", error);
    return false;
  }

  return true;
};

export const deleteProduct = async (productId: string): Promise<boolean> => {
  // First delete related images and product_categories entries
  await supabase.from("product_images").delete().eq("product_id", productId);
  await supabase.from("product_categories").delete().eq("product_id", productId);
  
  // Then delete the product itself
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", productId);

  if (error) {
    console.error("Error deleting product:", error);
    return false;
  }

  return true;
};

export const getProductById = async (id: string): Promise<Product | null> => {
  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      categories:product_categories(
        category:categories(*)
      ),
      images:product_images(*)
    `)
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching product:", error);
    return null;
  }

  // Transform data to flatten the structure
  const categories = data.categories?.map(pc => pc.category) || [];
  
  return {
    ...data,
    categories,
    images: data.images || []
  };
};

export const getProductBySlug = async (slug: string): Promise<Product | null> => {
  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      categories:product_categories(
        category:categories(*)
      ),
      images:product_images(*)
    `)
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching product by slug:", error);
    return null;
  }

  // Transform data to flatten the structure
  const categories = data.categories?.map(pc => pc.category) || [];
  
  return {
    ...data,
    categories,
    images: data.images || []
  };
};
