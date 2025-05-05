
import { Phone } from "lucide-react";

interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
}

const WhatsAppButton = ({ phoneNumber, message = "" }: WhatsAppButtonProps) => {
  const handleWhatsAppClick = () => {
    // Format phone number (remove spaces, dashes, etc.)
    const formattedPhone = phoneNumber.replace(/[^0-9]/g, "");
    const encodedMessage = encodeURIComponent(message);
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodedMessage}`;
    
    // Open in new tab
    window.open(whatsappUrl, "_blank");
  };

  return (
    <button 
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 left-6 z-50 bg-floral-green text-white p-3 rounded-full shadow-lg hover:bg-floral-green/90 transition-all flex items-center gap-2 whatsapp-btn group"
      aria-label="تواصل عبر واتساب"
    >
      <Phone size={24} />
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300">طلب الآن</span>
    </button>
  );
};

export default WhatsAppButton;
