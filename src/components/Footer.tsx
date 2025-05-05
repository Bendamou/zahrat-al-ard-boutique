
import { Phone, Mail, Home } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-floral-green text-white pt-12 pb-6">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Shop Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-amiri font-bold">زهرة الأرض</h3>
            <p className="max-w-sm">
              نقدم أجمل باقات الزهور الطازجة والنباتات المنزلية ذات الجودة العالية لجميع المناسبات.
            </p>
            <div className="flex space-x-4 space-x-reverse">
              {/* Social Icons would go here */}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:underline">الرئيسية</Link>
              </li>
              <li>
                <Link to="/products" className="hover:underline">منتجاتنا</Link>
              </li>
              <li>
                <Link to="/about" className="hover:underline">من نحن</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:underline">اتصل بنا</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">تواصل معنا</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 space-x-reverse">
                <Phone size={18} />
                <span>+123 456 7890</span>
              </li>
              <li className="flex items-center space-x-2 space-x-reverse">
                <Mail size={18} />
                <span>info@zahrat-alard.com</span>
              </li>
              <li className="flex items-center space-x-2 space-x-reverse">
                <Home size={18} />
                <span>شارع الزهور، المدينة</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-6 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} زهرة الأرض. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
