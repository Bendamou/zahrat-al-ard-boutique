
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare } from "lucide-react";

export interface CustomWhatsAppButtonProps {
  phoneNumber: string;
  defaultMessage: string;
  productName?: string;
}

const CustomWhatsAppButton = ({
  phoneNumber,
  defaultMessage,
  productName,
}: CustomWhatsAppButtonProps) => {
  const [customMessage, setCustomMessage] = useState("");

  const handleWhatsAppClick = () => {
    // Format phone number: remove any non-digit characters except the plus sign
    const formattedPhone = phoneNumber.replace(/[^\d+]/g, ""); 
    
    // Add "+" if it doesn't exist at the beginning
    const finalPhone = formattedPhone.startsWith("+") ? formattedPhone : `+${formattedPhone}`;
    
    const baseMessage = productName
      ? `${defaultMessage} (${productName})`
      : defaultMessage;
    
    const message = customMessage 
      ? `${baseMessage}\n\n${customMessage}`
      : baseMessage;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${finalPhone}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="w-full">
      <Textarea
        placeholder="أضف رسالتك المخصصة هنا (اختياري)..."
        value={customMessage}
        onChange={(e) => setCustomMessage(e.target.value)}
        className="mb-3 min-h-[100px] resize-none"
      />
      
      <Button
        onClick={handleWhatsAppClick}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded flex items-center justify-center gap-2"
      >
        <MessageSquare size={20} />
        <span>تواصل معنا عبر واتساب</span>
      </Button>
    </div>
  );
};

export default CustomWhatsAppButton;
