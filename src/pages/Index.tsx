
import { ArrowRight, Flower, ShoppingBag, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import WhatsAppButton from "../components/WhatsAppButton";

// Categories data
const categories = [
  { name: "باقات الزهور", icon: Flower, count: 24 },
  { name: "النباتات المنزلية", icon: Flower, count: 18 },
  { name: "هدايا", icon: ShoppingBag, count: 12 },
  { name: "مناسبات خاصة", icon: Users, count: 8 }
];

const Index = () => {
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Load the 5 most recent products from localStorage - optimized with useCallback
  const loadProducts = useCallback(() => {
    try {
      const savedProducts = localStorage.getItem('storeProducts');
      if (savedProducts) {
        const allProducts = JSON.parse(savedProducts);
        // Sort by ID in descending order to get the most recent products
        const latestProducts = [...allProducts]
          .sort((a, b) => b.id - a.id)
          .slice(0, 5);
        setFeaturedProducts(latestProducts);
      }
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);
    
  useEffect(() => {
    // Add a slight delay to prevent blocking the main thread during initial render
    const timer = setTimeout(loadProducts, 100);
    return () => clearTimeout(timer);
  }, [loadProducts]);

  return (
    <main className="min-h-screen">
      <Hero />

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <h2 className="section-title">تصفح الفئات</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {categories.map((category, index) => (
              <Link 
                key={index} 
                to="/products" 
                className="bg-floral-lavender rounded-lg p-6 text-center transition hover:shadow-md"
              >
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <category.icon className="text-floral-green" size={24} />
                </div>
                <h3 className="font-amiri font-bold text-lg mb-2">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.count} منتج</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Product Info Section */}
      <section className="py-12 bg-floral-cream">
        <div className="container">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6 md:p-8">
            <h2 className="text-2xl font-amiri font-bold mb-6 text-center text-floral-green">معلومات عن منتجاتنا</h2>
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4 items-start">
                <div className="bg-floral-pink/10 p-3 rounded-full">
                  <Flower className="text-floral-pink" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">باقات مصنوعة يدويًا</h3>
                  <p className="text-gray-700">جميع باقات الورد التي نقدمها مصنوعة يدويًا باستخدام ورود صناعية عالية الجودة. هذه الورود ليست طبيعية، لكنها تتميز بمظهر رائع ويمكن أن تدوم معك لسنوات طويلة، دون أن تذبل أو تتلف.</p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4 items-start">
                <div className="bg-floral-green/10 p-3 rounded-full">
                  <ShoppingBag className="text-floral-green" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">تصنيع حسب الطلب</h3>
                  <p className="text-gray-700">بعد أن يقوم العميل بتقديم الطلب، نبدأ مباشرة في تصميم الباقة حسب المواصفات المطلوبة. نحن لا نقدم منتجات جاهزة، بل نصنع كل باقة بشكل خاص وفني بعد استلام الطلب.</p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4 items-start">
                <div className="bg-floral-green/10 p-3 rounded-full">
                  <Users className="text-floral-green" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">مدة التصنيع</h3>
                  <p className="text-gray-700">من 2 إلى 4 أيام عمل، حسب نوع وحجم الباقة.</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <Link to="/products" className="btn-primary">
                اكتشف باقاتنا
                <ArrowRight size={18} className="mr-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-floral-cream/50">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="section-title">منتجاتنا المميزة</h2>
            <Link to="/products" className="text-floral-green font-medium hover:text-floral-pink transition flex items-center">
              عرض الكل
              <ArrowRight size={16} className="mr-2" />
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="animate-pulse">
                  <div className="bg-gray-200 h-64 rounded-lg mb-3"></div>
                  <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p>لا توجد منتجات متاحة حاليًا</p>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container">
          <h2 className="section-title mx-auto text-center">لماذا تختارنا</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center p-6 rounded-lg bg-floral-cream">
              <div className="w-16 h-16 bg-floral-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Flower className="text-floral-green" />
              </div>
              <h3 className="font-bold text-lg mb-2">باقات مميزة</h3>
              <p className="text-gray-600">باقات ورود صناعية مصنوعة يدويًا ومصممة لتدوم لسنوات طويلة</p>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-floral-cream">
              <div className="w-16 h-16 bg-floral-pink/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="text-floral-pink" />
              </div>
              <h3 className="font-bold text-lg mb-2">تصميم مخصص</h3>
              <p className="text-gray-600">نصمم كل باقة بشكل مخصص بعد استلام طلبك</p>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-floral-cream">
              <div className="w-16 h-16 bg-floral-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-floral-green" />
              </div>
              <h3 className="font-bold text-lg mb-2">تصاميم مميزة</h3>
              <p className="text-gray-600">تصاميم فريدة من نوعها لكل مناسبة وذوق</p>
            </div>
          </div>
        </div>
      </section>

      <WhatsAppButton phoneNumber="+212706461139" message="مرحبا، أود الاستفسار عن المنتجات لديكم." />
    </main>
  );
};

export default Index;
