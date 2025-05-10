
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Flower2, Clock } from "lucide-react";
import { getAllProducts, Product } from "@/services/productService";
import ProductCard from "@/components/ProductCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState<string[]>(["الكل"]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Load products from Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const productsData = await getAllProducts();
        setProducts(productsData);
        
        // Extract unique categories
        const uniqueCategories = ["الكل"];
        const processedCategories = new Set();
        
        productsData.forEach(product => {
          if (product.categories && product.categories.length > 0) {
            product.categories.forEach(category => {
              const categoryName = category.name_ar;
                  
              if (categoryName && !processedCategories.has(category.id)) {
                uniqueCategories.push(categoryName);
                processedCategories.add(category.id);
              }
            });
          }
        });
        
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast({
          title: "خطأ",
          description: "فشل في تحميل المنتجات",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, [toast]);

  // Function to get product name
  const getProductName = (product: Product) => {
    return product.name_ar;
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

  // Function to get the first category name
  const getProductCategory = (product: Product) => {
    if (product.categories && product.categories.length > 0) {
      return product.categories[0].name_ar;
    }
    return undefined;
  };

  const filteredProducts = products.filter((product) => {
    // Filter by category
    if (activeCategory !== "الكل") {
      const productCategory = getProductCategory(product);
      if (productCategory !== activeCategory) {
        return false;
      }
    }
    
    // Filter by search query
    if (searchQuery) {
      const name = getProductName(product).toLowerCase();
      if (!name.includes(searchQuery.toLowerCase())) {
        return false;
      }
    }
    
    return true;
  });

  if (isLoading) {
    return (
      <main className="min-h-screen py-8">
        <div className="container">
          <div className="text-center mb-8">
            <div className="animate-pulse">
              <div className="h-10 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-8">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-amiri font-bold mb-4 text-floral-green">منتجاتنا</h1>
          <p className="max-w-2xl mx-auto text-gray-600 mb-4">
            اكتشف مجموعتنا المتنوعة من الباقات والنباتات المنزلية والهدايا المميزة
          </p>
          
          {/* Product Info Banner */}
          <div className="bg-floral-cream rounded-lg p-4 max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
              <div className="flex items-center gap-2 text-floral-green">
                <Flower2 size={20} />
                <p className="text-sm font-medium">باقات ورد صناعية مصنوعة يدويًا</p>
              </div>
              <div className="h-4 w-px bg-floral-green/20 hidden md:block"></div>
              <div className="flex items-center gap-2 text-floral-pink">
                <Clock size={20} />
                <p className="text-sm font-medium">التصنيع يبدأ بعد الطلب (2-4 أيام)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 space-y-4 md:space-y-0">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full transition ${
                  activeCategory === category
                    ? "bg-floral-green text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-auto">
            <input
              type="text"
              placeholder="ابحث عن منتج..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-full border border-gray-300 w-full md:w-64"
            />
            <Search 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
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
        ) : (
          <div className="text-center py-12">
            <Flower2 size={48} className="mx-auto text-floral-pink mb-4" />
            <h3 className="text-xl font-bold mb-2">لم يتم العثور على منتجات</h3>
            <p className="text-gray-600">
              لم نتمكن من العثور على منتجات تطابق البحث. جرب بحثًا مختلفًا أو تصفح جميع الفئات.
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Products;
