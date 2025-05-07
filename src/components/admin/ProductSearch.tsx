
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ProductSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  placeholder?: string;
}

const ProductSearch = ({ 
  searchQuery, 
  onSearchChange, 
  placeholder = "Rechercher un produit..." 
}: ProductSearchProps) => {
  return (
    <div className="mb-4 relative">
      <Input
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10 w-full transition-all focus:ring-2 focus:ring-floral-green focus:border-transparent"
      />
      <Search 
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
        size={18} 
      />
    </div>
  );
};

export default ProductSearch;
