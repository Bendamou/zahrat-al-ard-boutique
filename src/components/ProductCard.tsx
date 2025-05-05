
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

const ProductCard = ({ id, name, price, image, category }: ProductCardProps) => {
  return (
    <div className="product-card group">
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-64 object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 bg-floral-green text-white text-xs py-1 px-2 rounded">
          {category}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-amiri font-bold text-lg mb-2">{name}</h3>
        <div className="flex justify-between items-center">
          <p className="font-bold text-floral-green">{price} ﷼</p>
          <Link 
            to={`/products/${id}`}
            className="bg-floral-pink text-white p-2 rounded-full hover:bg-opacity-90 transition"
          >
            <ShoppingBag size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
