
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
      className="whatsapp-btn"
      aria-label="تواصل عبر واتساب"
    >
      <Phone size={24} />
    </button>
  );
};

export default WhatsAppButton;
