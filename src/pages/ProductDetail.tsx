
import { useParams } from "react-router-dom";
import { Flower2 } from "lucide-react";
import ProductImageGallery from "../components/ProductImageGallery";
import CustomWhatsAppButton from "../components/CustomWhatsAppButton";

// Données temporaires (identiques à celles de Products.tsx)
const products = [
  {
    id: 1,
    name: "باقة الربيع",
    price: 120,
    images: [
      "https://images.unsplash.com/photo-1518495973542-4542c06a5843",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
      "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07"
    ],
    category: "باقات",
    description: "باقة مميزة من الورود الصناعية المصنوعة يدويًا، تتميز بألوان الربيع الزاهية وتدوم لسنوات طويلة."
  },
  {
    id: 2,
    name: "نبتة المنزل",
    price: 80,
    images: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e"
    ],
    category: "نباتات",
    description: "نبتة منزلية صناعية جميلة، سهلة العناية لا تحتاج إلى ماء أو ضوء، مثالية للمنازل والمكاتب."
  },
  {
    id: 3,
    name: "باقة الفرح",
    price: 150,
    images: [
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
      "https://images.unsplash.com/photo-1518495973542-4542c06a5843"
    ],
    category: "باقات",
    description: "باقة مميزة للمناسبات السعيدة، مصنوعة من أجود أنواع الورود الصناعية التي تحتفظ برونقها وجمالها لفترة طويلة."
  },
  {
    id: 4,
    name: "هدية مميزة",
    price: 200,
    images: [
      "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
      "https://images.unsplash.com/photo-1518495973542-4542c06a5843"
    ],
    category: "هدايا",
    description: "هدية فاخرة تتضمن باقة ورد صناعية مع تغليف أنيق، مناسبة للمناسبات الخاصة والأعياد."
  }
];

const ProductDetail = () => {
  const { id } = useParams();
  const productId = parseInt(id || "0");
  
  const product = products.find(p => p.id === productId);
  
  if (!product) {
    return (
      <div className="container py-12 text-center">
        <Flower2 size={48} className="mx-auto text-floral-pink mb-4" />
        <h1 className="text-2xl font-amiri font-bold mb-2">عذراً، لم يتم العثور على المنتج</h1>
        <p className="text-gray-600 mb-6">لم نتمكن من العثور على المنتج الذي تبحث عنه.</p>
        <a href="/products" className="inline-block bg-floral-green text-white py-2 px-4 rounded hover:bg-opacity-90 transition">
          العودة إلى صفحة المنتجات
        </a>
      </div>
    );
  }
  
  return (
    <main className="min-h-screen py-8">
      <div className="container">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            {/* Product Images Gallery */}
            <div>
              <ProductImageGallery 
                images={product.images} 
                productName={product.name} 
              />
            </div>
            
            {/* Product Info */}
            <div className="flex flex-col">
              <div className="mb-auto">
                <div className="inline-block bg-floral-cream text-floral-green text-sm py-1 px-3 rounded mb-2">
                  {product.category}
                </div>
                <h1 className="text-3xl font-amiri font-bold mb-4">{product.name}</h1>
                <p className="text-gray-700 mb-4">{product.description}</p>
                
                <div className="text-2xl font-bold text-floral-green mb-6">
                  {product.price} ﷼
                </div>
                
                <div className="bg-floral-cream rounded-lg p-4 mb-6">
                  <h3 className="font-bold mb-2 text-floral-green">معلومات عن المنتج:</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <Flower2 className="text-floral-pink mr-2 mt-1" size={16} />
                      <span>باقة ورد صناعية تدوم للأبد</span>
                    </li>
                    <li className="flex items-start">
                      <Flower2 className="text-floral-pink mr-2 mt-1" size={16} />
                      <span>مصنوعة يدويًا من مواد عالية الجودة</span>
                    </li>
                    <li className="flex items-start">
                      <Flower2 className="text-floral-pink mr-2 mt-1" size={16} />
                      <span>لا تحتاج إلى ماء أو عناية خاصة</span>
                    </li>
                    <li className="flex items-start">
                      <Flower2 className="text-floral-pink mr-2 mt-1" size={16} />
                      <span>مثالية كهدية أو لتزيين المنزل</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Custom WhatsApp Button with Personalized Message */}
              <CustomWhatsAppButton 
                phoneNumber="+212706461139"
                defaultMessage={`مرحباً، أود الاستفسار عن ${product.name}`}
                productName={product.name}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
