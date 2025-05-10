
import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import CustomWhatsAppButton from "@/components/CustomWhatsAppButton";
import { useLanguage } from "@/contexts/LanguageContext"; 
import { getAllProducts, getFeaturedProducts, Product } from "@/services/productService";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(4);
  const { t } = useLanguage();
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // First try to get featured products
        const featured = await getFeaturedProducts();
        setFeaturedProducts(featured);
        
        // Then get all products
        const allProducts = await getAllProducts();
        setProducts(allProducts);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("خطأ في تحميل المنتجات");
        toast({
          title: "خطأ",
          description: "فشل في تحميل المنتجات",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [toast]);

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + 4);
  };

  // Fonction pour obtenir le nom du produit
  const getProductName = (product: Product) => {
    return product.name_ar;
  };

  // Fonction pour obtenir la description du produit
  const getProductDescription = (product: Product) => {
    return product.description_ar || "";
  };

  // Fonction pour obtenir l'image du produit
  const getProductImage = (product: Product) => {
    if (product.images && product.images.length > 0) {
      // Try to find primary image first
      const primaryImage = product.images.find(img => img.is_primary);
      if (primaryImage) return primaryImage.image_url;
      
      // If no primary image, return the first one
      return product.images[0].image_url;
    }
    
    // Default image if no images are available
    return "https://images.unsplash.com/photo-1518495973542-4542c06a5843";
  };

  // Fonction pour obtenir la première catégorie
  const getProductCategory = (product: Product) => {
    if (product.categories && product.categories.length > 0) {
      return product.categories[0].name_ar;
    }
    return undefined;
  };

  return (
    <div className="bg-floral-cream">
      <Hero />

      {/* Featured Products Section */}
      {featuredProducts.length > 0 && (
        <section className="py-16 container text-center">
          <h2 className="section-title mx-auto">{t('common', 'featuredProducts', 'منتجاتنا المميزة')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">
            {t('common', 'featuredProductsDescription', 'اكتشف مجموعتنا المميزة من المنتجات المختارة بعناية لك')}
          </p>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="w-12 h-12 border-4 border-floral-green rounded-full border-t-transparent animate-spin"></div>
            </div>
          ) : error ? (
            <div className="text-red-500 text-center py-8">{error}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.slice(0, 4).map((product) => (
                <ProductCard 
                  key={product.id}
                  id={product.id}
                  name={getProductName(product)}
                  price={product.price}
                  image={getProductImage(product)}
                  category={getProductCategory(product)}
                  slug={product.slug}
                />
              ))}
            </div>
          )}
        </section>
      )}

      {/* All Products Section */}
      <section className="py-16 bg-white">
        <div className="container text-center">
          <h2 className="section-title mx-auto">{t('common', 'ourProducts', 'منتجاتنا')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">
            {t('common', 'productsDescription', 'اكتشف مجموعتنا المتنوعة من المنتجات الفريدة والمصنوعة بحرفية عالية')}
          </p>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="w-12 h-12 border-4 border-floral-green rounded-full border-t-transparent animate-spin"></div>
            </div>
          ) : error ? (
            <div className="text-red-500 text-center py-8">{error}</div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.slice(0, visibleCount).map((product) => (
                  <ProductCard 
                    key={product.id}
                    id={product.id}
                    name={getProductName(product)}
                    price={product.price}
                    image={getProductImage(product)}
                    category={getProductCategory(product)}
                    slug={product.slug}
                  />
                ))}
              </div>
              
              {visibleCount < products.length && (
                <div className="mt-12">
                  <button 
                    onClick={handleLoadMore}
                    className="btn-primary"
                  >
                    {t('common', 'loadMore', 'عرض المزيد')}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <CustomWhatsAppButton 
        phoneNumber="212706461139" 
        defaultMessage="مرحبا، أود الاستفسار عن منتجاتكم" 
      />
    </div>
  );
};

export default Index;
