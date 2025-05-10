
import React, { useState, useEffect } from "react";
import { ShoppingBag, Flower2, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const DashboardAdmin = () => {
  const { toast } = useToast();
  const [stats, setStats] = useState([
    { title: "منتجات", value: "0", icon: ShoppingBag, color: "bg-blue-500" },
    { title: "طلبات", value: "0", icon: Clock, color: "bg-floral-green" },
    { title: "تصنيفات", value: "0", icon: Flower2, color: "bg-floral-pink" },
  ]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStatistics = async () => {
      setIsLoading(true);
      try {
        // Récupérer le nombre de produits
        const { count: productsCount, error: productsError } = await supabase
          .from("products")
          .select("*", { count: "exact", head: true });

        if (productsError) throw productsError;

        // Récupérer le nombre de catégories
        const { count: categoriesCount, error: categoriesError } = await supabase
          .from("categories")
          .select("*", { count: "exact", head: true });

        if (categoriesError) throw categoriesError;

        // Mettre à jour les statistiques
        setStats(prev => 
          prev.map(stat => {
            if (stat.title === "منتجات") {
              return { ...stat, value: String(productsCount || 0) };
            }
            if (stat.title === "تصنيفات") {
              return { ...stat, value: String(categoriesCount || 0) };
            }
            return stat;
          })
        );
      } catch (error) {
        console.error("Error loading statistics:", error);
        toast({
          title: "خطأ",
          description: "تعذر تحميل الإحصائيات",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchStatistics();
  }, [toast]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">لوحة التحكم</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm flex items-center">
            <div className={`${stat.color} p-4 rounded text-white ml-4`}>
              <stat.icon size={24} />
            </div>
            <div>
              <h3 className="text-gray-500 text-sm">{stat.title}</h3>
              {isLoading ? (
                <div className="h-8 w-16 bg-gray-200 animate-pulse rounded"></div>
              ) : (
                <p className="font-bold text-2xl">{stat.value}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="font-bold text-lg mb-4">النشاط الأخير</h2>
        <div className="space-y-4">
          <div className="flex items-start pb-4 border-b">
            <div className="bg-blue-100 p-2 rounded">
              <ShoppingBag size={18} className="text-blue-500" />
            </div>
            <div className="mr-3">
              <p className="font-medium">طلب جديد تم استلامه</p>
              <p className="text-sm text-gray-500">باقة الربيع - 120 ﷼</p>
              <p className="text-xs text-gray-400">قبل ساعتين</p>
            </div>
          </div>
          <div className="flex items-start pb-4 border-b">
            <div className="bg-green-100 p-2 rounded">
              <Flower2 size={18} className="text-green-500" />
            </div>
            <div className="mr-3">
              <p className="font-medium">تم تحديث المنتج</p>
              <p className="text-sm text-gray-500">هدية مميزة - تم تعديل السعر</p>
              <p className="text-xs text-gray-400">قبل 5 ساعات</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
