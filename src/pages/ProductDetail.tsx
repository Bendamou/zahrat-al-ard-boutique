
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import WhatsAppButton from "../components/WhatsAppButton";
import { useToast } from "@/hooks/use-toast";

// Temporary data (same as in Products.tsx)
const allProducts = [
  {
    id: 1,
    name: "باقة الربيع",
    price: 120,
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843",
    category: "باقات",
    description: "باقة مميزة من الورود الصناعية المصنوعة يدويًا، تتميز بألوان الربيع الزاهية وتدوم لسنوات طويلة."
  },
  {
    id: 2,
    name: "نبتة المنزل",
    price: 80,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    category: "نباتات",
    description: "نبتة منزلية صناعية جميلة، سهلة العناية لا تحتاج إلى ماء أو ضوء، مثالية للمنازل والمكاتب."
  },
  {
    id: 3,
    name: "باقة الفرح",
    price: 150,
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    category: "باقات",
    description: "باقة مميزة للمناسبات السعيدة، مصنوعة من أجود أنواع الورود الصناعية التي تحتفظ برونقها وجمالها لفترة طويلة."
  },
  {
    id: 4,
    name: "هدية مميزة",
    price: 200,
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
    category: "هدايا",
    description: "هدية فاخرة تتضمن باقة ورد صناعية مع تغليف أنيق، مناسبة للمناسبات الخاصة والأعياد."
  },
  {
    id: 5,
    name: "باقة الصباح",
    price: 110,
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843",
    category: "باقات",
    description: "باقة منعشة بألوان فاتحة، مصنوعة يدويًا من أجود أنواع الورود الصناعية، مثالية لإضافة لمسة جمالية للمكان."
  },
  {
    id: 6,
    name: "نبتة الظل",
    price: 90,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    category: "نباتات",
    description: "نبتة صناعية فاخرة مناسبة للأماكن ذات الإضاءة المنخفضة، مصممة لتضيف لمسة من الطبيعة إلى ديكور منزلك."
  },
  {
    id: 7,
    name: "باقة الاحتفال",
    price: 180,
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    category: "باقات",
    description: "باقة فاخرة مصممة خصيصًا للاحتفالات والمناسبات الخاصة، مصنوعة يدويًا من ورود صناعية عالية الجودة."
  },
  {
    id: 8,
    name: "هدية الحب",
    price: 220,
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
    category: "هدايا",
    description: "هدية رومانسية مميزة تتضمن باقة ورد صناعية حمراء، مغلفة بشكل أنيق ومناسبة للتعبير عن مشاعر الحب."
  }
];

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate API call
    const fetchProduct = () => {
      setIsLoading(true);
      setTimeout(() => {
        const foundProduct = allProducts.find(p => p.id === Number(id));
        setProduct(foundProduct || null);
        setIsLoading(false);
      }, 300);
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    toast({
      title: "تمت الإضافة إلى السلة",
      description: `تمت إضافة ${product?.name} إلى سلة المشتريات`,
    });
  };

  if (isLoading) {
    return (
      <div className="container py-16 flex justify-center">
        <div className="animate-pulse flex flex-col items-center space-y-4">
          <div className="h-8 w-64 bg-gray-200 rounded"></div>
          <div className="h-64 w-full max-w-2xl bg-gray-200 rounded"></div>
          <div className="h-4 w-full max-w-md bg-gray-200 rounded"></div>
          <div className="h-4 w-full max-w-sm bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">المنتج غير موجود</h2>
        <p className="mb-6">عذراً، لا يمكن العثور على المنتج المطلوب.</p>
        <Link to="/products" className="btn-primary">
          العودة إلى المنتجات
        </Link>
      </div>
    );
  }

  return (
    <main className="container py-8">
      {/* Back button */}
      <Link to="/products" className="flex items-center text-floral-green font-medium mb-8 hover:underline">
        <ArrowLeft size={20} className="ml-2" />
        العودة إلى المنتجات
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto object-cover"
          />
          <div className="absolute top-4 right-4 bg-floral-green text-white text-sm py-1 px-3 rounded">
            {product.category}
          </div>
          <div className="absolute top-4 left-4 bg-floral-pink text-white text-sm py-1 px-3 rounded">
            صناعية
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <h1 className="font-amiri font-bold text-3xl mb-2">{product.name}</h1>
          <p className="font-bold text-floral-green text-2xl mb-4">{product.price} ﷼</p>
          
          {/* Product Manufacturing Info */}
          <div className="bg-floral-cream rounded-lg p-4 mb-6">
            <p className="text-sm font-medium mb-2">⏳ مدة التصنيع: 2-4 أيام عمل</p>
            <p className="text-sm">🛠️ يتم تصنيع المنتج يدويًا بعد الطلب</p>
          </div>
          
          <div className="mb-6">
            <h3 className="font-bold text-lg mb-2">الوصف</h3>
            <p className="text-gray-700">{product.description}</p>
          </div>

          {/* Artificial Flowers Description */}
          <div className="bg-gray-100 rounded-lg p-4 mb-6">
            <h3 className="font-bold text-lg mb-2">معلومات عن المنتج</h3>
            <p className="text-gray-700 text-sm mb-2">
              💐 جميع باقاتنا مصنوعة يدويًا من ورود صناعية عالية الجودة.
            </p>
            <p className="text-gray-700 text-sm">
              ✨ تتميز بمظهر رائع وتدوم لسنوات طويلة، دون أن تذبل أو تتلف.
            </p>
          </div>

          {/* Order Button */}
          <button 
            onClick={() => window.open(`https://wa.me/+212706461139?text=مرحبا، أود طلب ${product.name} بسعر ${product.price} ﷼`, "_blank")}
            className="bg-floral-green text-white py-3 px-6 rounded-lg flex items-center justify-center hover:bg-opacity-90 transition mb-4"
          >
            <ShoppingBag size={20} className="ml-2" />
            اطلب الآن عبر الواتساب
          </button>
          
          <p className="text-sm text-gray-500 text-center">
            سيتم توجيهك إلى الواتساب لإكمال طلبك
          </p>
        </div>
      </div>

      <WhatsAppButton phoneNumber="+212706461139" message={`مرحبا، أود طلب ${product.name} بسعر ${product.price} ﷼`} />
    </main>
  );
};

export default ProductDetail;
