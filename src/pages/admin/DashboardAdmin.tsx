
import React from "react";
import { ShoppingBag, Users, Flower2, Clock } from "lucide-react";

const DashboardAdmin = () => {
  // Ces données seraient normalement récupérées d'une base de données
  const stats = [
    { title: "Produits", value: "24", icon: ShoppingBag, color: "bg-blue-500" },
    { title: "Commandes", value: "12", icon: Clock, color: "bg-floral-green" },
    { title: "Catégories", value: "3", icon: Flower2, color: "bg-floral-pink" },
    { title: "Clients", value: "46", icon: Users, color: "bg-amber-500" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Tableau de bord</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm flex items-center">
            <div className={`${stat.color} p-4 rounded text-white mr-4`}>
              <stat.icon size={24} />
            </div>
            <div>
              <h3 className="text-gray-500 text-sm">{stat.title}</h3>
              <p className="font-bold text-2xl">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="font-bold text-lg mb-4">Activité récente</h2>
        <div className="space-y-4">
          <div className="flex items-start pb-4 border-b">
            <div className="bg-blue-100 p-2 rounded">
              <ShoppingBag size={18} className="text-blue-500" />
            </div>
            <div className="ml-3">
              <p className="font-medium">Nouvelle commande reçue</p>
              <p className="text-sm text-gray-500">باقة الربيع - 120 ﷼</p>
              <p className="text-xs text-gray-400">Il y a 2 heures</p>
            </div>
          </div>
          <div className="flex items-start pb-4 border-b">
            <div className="bg-green-100 p-2 rounded">
              <Flower2 size={18} className="text-green-500" />
            </div>
            <div className="ml-3">
              <p className="font-medium">Produit mis à jour</p>
              <p className="text-sm text-gray-500">هدية مميزة - Prix modifié</p>
              <p className="text-xs text-gray-400">Il y a 5 heures</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-amber-100 p-2 rounded">
              <Users size={18} className="text-amber-500" />
            </div>
            <div className="ml-3">
              <p className="font-medium">Nouveau message client</p>
              <p className="text-sm text-gray-500">Question sur la livraison</p>
              <p className="text-xs text-gray-400">Il y a 1 jour</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
