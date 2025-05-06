
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ProductSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const ProductSearch = ({ searchQuery, onSearchChange }: ProductSearchProps) => {
  return (
    <div className="mb-4 relative">
      <Input
        placeholder="Rechercher un produit..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10"
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
    </div>
  );
};

export default ProductSearch;
