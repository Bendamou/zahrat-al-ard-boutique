
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Flower2 } from "lucide-react";
import ProductImageGallery from "../components/ProductImageGallery";
import CustomWhatsAppButton from "../components/CustomWhatsAppButton";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  images?: string[];
  category: string;
  description: string;
}

const ProductDetail = () => {
  const { id } = useParams();
  const productId = parseInt(id || "0");
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Load product from localStorage
  useEffect(() => {
    const loadProduct = () => {
      const savedProducts = localStorage.getItem('storeProducts');
      if (savedProducts) {
        const products = JSON.parse(savedProducts);
        const foundProduct = products.find((p: Product) => p.id === productId);
        setProduct(foundProduct || null);
      }
      setIsLoading(false);
    };
    
    loadProduct();
  }, [productId]);
  
  if (isLoading) {
    return (
      <div className="container py-12 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    );
  }
  
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
  
  // Ensure product.images exists
  const productImages = product.images?.length ? product.images : [product.image];
  
  return (
    <main className="min-h-screen py-8">
      <div className="container">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            {/* Product Images Gallery */}
            <div>
              <ProductImageGallery 
                images={productImages} 
                productName={product.name} 
              />
            </div>
            
            {/* Product Info */}
            <div className="flex flex-col">
              <div className="mb-auto">
                <div className="inline-block bg-floral-cream text-floral-green text-sm py-1 px-3 rounded mb-2">
                  {product.category || "بدون تصنيف"}
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
