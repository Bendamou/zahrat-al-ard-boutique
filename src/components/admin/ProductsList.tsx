
import React from "react";
import { Edit, Trash2, Eye, Search, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/services/productService";

interface ProductsListProps {
  products: Product[];
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
  onViewProduct?: (product: Product) => void;
  onToggleFeatured?: (product: Product) => void;
}

const ProductsList = ({ 
  products, 
  onEditProduct, 
  onDeleteProduct, 
  onViewProduct,
  onToggleFeatured 
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
            <TableHead>Mise en avant</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.length > 0 ? (
            products.map((product) => (
              <TableRow key={product.id} className="hover:bg-gray-50 transition-colors">
                <TableCell>
                  <img
                    src={product.images && product.images.length > 0 
                      ? product.images.find(img => img.is_primary)?.image_url || product.images[0].image_url
                      : "https://images.unsplash.com/photo-1518495973542-4542c06a5843"}
                    alt={product.name_ar}
                    className="w-16 h-16 object-cover rounded-md border border-gray-200"
                    loading="lazy"
                  />
                </TableCell>
                <TableCell className="font-medium">
                  <div className="truncate max-w-xs" title={product.name_ar}>
                    {product.name_ar}
                  </div>
                  <div className="text-xs text-gray-500 truncate max-w-xs" 
                    title={product.description_ar || ""}>
                    {product.description_ar && product.description_ar.length > 60 
                      ? `${product.description_ar.substring(0, 60)}...` 
                      : product.description_ar}
                  </div>
                </TableCell>
                <TableCell>
                  {product.categories && product.categories.length > 0 ? (
                    <Badge variant="outline" 
                      className="bg-floral-cream text-floral-green border-floral-green">
                      {product.categories[0].name_ar}
                    </Badge>
                  ) : (
                    <span className="text-gray-400 italic text-sm">Sans catégorie</span>
                  )}
                </TableCell>
                <TableCell className="font-medium">{product.price} ﷼</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onToggleFeatured && onToggleFeatured(product)}
                    className={product.is_featured ? "text-yellow-500" : "text-gray-400"}
                  >
                    <Star size={16} className={product.is_featured ? "fill-yellow-500" : ""} />
                  </Button>
                </TableCell>
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
              <TableCell colSpan={6} className="text-center py-10 text-gray-500">
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
