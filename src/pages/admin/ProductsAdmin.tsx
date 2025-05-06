
import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import AddProductForm from "@/components/admin/AddProductForm";
import ProductsList from "@/components/admin/ProductsList";
import ProductSearch from "@/components/admin/ProductSearch";

// Initial products data (moved to a separate constant)
const initialProducts = [
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
    description: "باقة صباحية منعشة مصنوعة من الورود الصناعية ذات الألوان الفاتحة والمبهجة."
  },
  {
    id: 6,
    name: "نبتة الظل",
    price: 90,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    category: "نباتات",
    description: "نبتة صناعية مثالية للأماكن قليلة الإضاءة، تضيف لمسة من الأناقة والحيوية للمكان."
  },
  {
    id: 7,
    name: "باقة الاحتفال",
    price: 180,
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    category: "باقات",
    description: "باقة مميزة للاحتفالات والمناسبات الخاصة، مصممة بعناية لإضفاء البهجة."
  },
  {
    id: 8,
    name: "هدية الحب",
    price: 220,
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
    category: "هدايا",
    description: "هدية رومانسية مميزة مع تغليف أنيق، مثالية للتعبير عن المشاعر في المناسبات الخاصة."
  },
  {
    id: 9,
    name: "وردة الصيف",
    price: 75,
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946",
    category: "",
    description: "وردة صناعية مميزة بألوان الصيف، مثالية للديكور المنزلي والهدايا البسيطة."
  }
];

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

const ProductsAdmin = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const { toast } = useToast();

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Load products from localStorage if available
  useEffect(() => {
    const savedProducts = localStorage.getItem('storeProducts');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      // Initialize localStorage with default products
      localStorage.setItem('storeProducts', JSON.stringify(initialProducts));
    }
  }, []);

  const handleAddProduct = (newProduct: Product) => {
    // Ajout d'un nouvel ID (temporaire jusqu'à l'intégration de Supabase)
    const newId = Math.max(0, ...products.map((p) => p.id)) + 1;
    const productWithId = { ...newProduct, id: newId };
    
    // Update state and localStorage
    const updatedProducts = [...products, productWithId];
    setProducts(updatedProducts);
    localStorage.setItem('storeProducts', JSON.stringify(updatedProducts));
    
    toast({
      title: "Produit ajouté",
      description: `${newProduct.name} a été ajouté avec succès.`,
    });
    setShowAddForm(false);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    const updatedProducts = products.map((p) =>
      p.id === updatedProduct.id ? updatedProduct : p
    );
    
    // Update state and localStorage
    setProducts(updatedProducts);
    localStorage.setItem('storeProducts', JSON.stringify(updatedProducts));
    
    toast({
      title: "Produit mis à jour",
      description: `${updatedProduct.name} a été mis à jour avec succès.`,
    });
    setEditingProduct(null);
    setShowAddForm(false);
  };

  const handleDeleteProduct = (id: number) => {
    const productName = products.find(p => p.id === id)?.name;
    const updatedProducts = products.filter((p) => p.id !== id);
    
    // Update state and localStorage
    setProducts(updatedProducts);
    localStorage.setItem('storeProducts', JSON.stringify(updatedProducts));
    
    toast({
      title: "Produit supprimé",
      description: `${productName} a été supprimé avec succès.`,
    });
  };

  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setShowAddForm(true);
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
        />
      ) : (
        <>
          <ProductSearch 
            searchQuery={searchQuery} 
            onSearchChange={setSearchQuery} 
          />
          <ProductsList 
            products={filteredProducts} 
            onEditProduct={handleEditClick} 
            onDeleteProduct={handleDeleteProduct} 
          />
        </>
      )}
    </div>
  );
};

export default ProductsAdmin;
