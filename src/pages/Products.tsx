
import { useState } from "react";
import ProductCard from "../components/ProductCard";
import WhatsAppButton from "../components/WhatsAppButton";
import { Search, Flower2, Clock } from "lucide-react";

// Données temporaires
const allProducts = [
  {
    id: 1,
    name: "باقة الربيع",
    price: 120,
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843",
    category: "باقات"
  },
  {
    id: 2,
    name: "نبتة المنزل",
    price: 80,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    category: "نباتات"
  },
  {
    id: 3,
    name: "باقة الفرح",
    price: 150,
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    category: "باقات"
  },
  {
    id: 4,
    name: "هدية مميزة",
    price: 200,
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
    category: "هدايا"
  },
  {
    id: 5,
    name: "باقة الصباح",
    price: 110,
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843",
    category: "باقات"
  },
  {
    id: 6,
    name: "نبتة الظل",
    price: 90,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    category: "نباتات"
  },
  {
    id: 7,
    name: "باقة الاحتفال",
    price: 180,
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    category: "باقات"
  },
  {
    id: 8,
    name: "هدية الحب",
    price: 220,
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
    category: "هدايا"
  }
];

const categories = ["الكل", "باقات", "نباتات", "هدايا"];

const Products = () => {
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = allProducts.filter((product) => {
    // Filter by category
    if (activeCategory !== "الكل" && product.category !== activeCategory) {
      return false;
    }
    
    // Filter by search query
    if (
      searchQuery &&
      !product.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    
    return true;
  });

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
              <ProductCard key={product.id} {...product} />
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

      <WhatsAppButton phoneNumber="+123456789" message="مرحبا، أود طلب باقة الورد الصناعية." />
    </main>
  );
};

export default Products;
