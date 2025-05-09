
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
  const { t, currentLanguage } = useLanguage();
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
        setError("Une erreur est survenue lors du chargement des produits");
        toast({
          title: "Erreur",
          description: "Impossible de charger les produits",
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

  // Function to get product name based on current language
  const getProductName = (product: Product) => {
    if (currentLanguage === 'fr' && product.name_fr) return product.name_fr;
    if (currentLanguage === 'en' && product.name_en) return product.name_en;
    return product.name_ar; // Default to Arabic
  };

  // Function to get product description based on current language
  const getProductDescription = (product: Product) => {
    if (currentLanguage === 'fr' && product.description_fr) return product.description_fr;
    if (currentLanguage === 'en' && product.description_en) return product.description_en;
    return product.description_ar || ""; // Default to Arabic or empty string
  };

  // Function to get product image
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
        phoneNumber="966500000000" 
        defaultMessage="مرحبا، أود الاستفسار عن منتجاتكم" 
      />
    </div>
  );
};

export default Index;
