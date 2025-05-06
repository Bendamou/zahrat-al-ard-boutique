
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Trash2, MessageSquare } from "lucide-react";

// Données temporaires pour les messages
const initialMessages = [
  {
    id: 1,
    name: "Ahmed",
    message: "مرحبا، أود معرفة إذا كان بإمكاني طلب باقة مخصصة؟",
    product: "باقة الربيع",
    date: "2025-05-01",
    responded: true
  },
  {
    id: 2,
    name: "Layla",
    message: "هل يمكنني الحصول على توصيل لمدينة جدة؟",
    product: "نبتة المنزل",
    date: "2025-05-03",
    responded: false
  },
  {
    id: 3,
    name: "Mohammed",
    message: "ما هي المدة المتوقعة للتوصيل؟",
    product: "هدية مميزة",
    date: "2025-05-04",
    responded: false
  },
  {
    id: 4,
    name: "Sara",
    message: "هل يمكنني اختيار ألوان مختلفة للباقة؟",
    product: "باقة الفرح",
    date: "2025-05-05",
    responded: true
  }
];

const MessagesAdmin = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMessages = messages.filter((message) =>
    message.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.product.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteMessage = (id: number) => {
    setMessages(messages.filter((message) => message.id !== id));
  };

  const handleMarkAsResponded = (id: number) => {
    setMessages(
      messages.map((message) =>
        message.id === id ? { ...message, responded: true } : message
      )
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des messages</h1>
      </div>

      <div className="mb-4 relative">
        <Input
          placeholder="Rechercher un message..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Produit</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMessages.length > 0 ? (
              filteredMessages.map((message) => (
                <TableRow key={message.id}>
                  <TableCell>{message.date}</TableCell>
                  <TableCell className="font-medium">{message.name}</TableCell>
                  <TableCell>{message.product}</TableCell>
                  <TableCell className="max-w-xs truncate">{message.message}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        message.responded
                          ? "bg-green-100 text-green-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {message.responded ? "Répondu" : "En attente"}
                    </span>
                  </TableCell>
                  <TableCell className="flex justify-end space-x-2">
                    {!message.responded && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-green-500 hover:text-green-700"
                        onClick={() => handleMarkAsResponded(message.id)}
                      >
                        <MessageSquare size={16} />
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDeleteMessage(message.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  Aucun message trouvé
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MessagesAdmin;
