
import React from "react";
import { Edit, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

interface ProductsListProps {
  products: Product[];
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (id: number) => void;
  onViewProduct?: (product: Product) => void;
}

const ProductsList = ({ 
  products, 
  onEditProduct, 
  onDeleteProduct, 
  onViewProduct 
}: ProductsListProps) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="w-[80px]">Image</TableHead>
            <TableHead>Nom</TableHead>
            <TableHead>Catégorie</TableHead>
            <TableHead>Prix</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.length > 0 ? (
            products.map((product) => (
              <TableRow key={product.id} className="hover:bg-gray-50 transition-colors">
                <TableCell>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-md border border-gray-200"
                    loading="lazy"
                  />
                </TableCell>
                <TableCell className="font-medium">
                  <div className="truncate max-w-xs" title={product.name}>
                    {product.name}
                  </div>
                  <div className="text-xs text-gray-500 truncate max-w-xs" title={product.description}>
                    {product.description.length > 60 
                      ? `${product.description.substring(0, 60)}...` 
                      : product.description}
                  </div>
                </TableCell>
                <TableCell>
                  {product.category ? (
                    <Badge variant="outline" className="bg-floral-cream text-floral-green border-floral-green">
                      {product.category}
                    </Badge>
                  ) : (
                    <span className="text-gray-400 italic text-sm">Sans catégorie</span>
                  )}
                </TableCell>
                <TableCell className="font-medium">{product.price} ﷼</TableCell>
                <TableCell className="flex justify-end space-x-2">
                  {onViewProduct && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-blue-500 hover:text-blue-700 hover:bg-blue-50"
                      onClick={() => onViewProduct(product)}
                    >
                      <Eye size={16} />
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-amber-500 hover:text-amber-700 hover:bg-amber-50"
                    onClick={() => onEditProduct(product)}
                  >
                    <Edit size={16} />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => onDeleteProduct(product.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-10 text-gray-500">
                <div className="flex flex-col items-center justify-center">
                  <Search className="h-12 w-12 text-gray-300 mb-3" />
                  <p>Aucun produit trouvé</p>
                  <p className="text-sm text-gray-400">Essayez de modifier vos critères de recherche</p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductsList;
