
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-b from-floral-cream to-white py-16 md:py-24">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 order-2 md:order-1 text-center md:text-right">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-amiri font-bold mb-4 text-floral-green">
              باقات الزهور <br /> الأكثر جمالاً
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-md mx-auto md:mr-0">
              اكتشف تشكيلتنا الواسعة من الباقات الطازجة التي تم تصميمها خصيصًا لجميع المناسبات.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Link to="/products" className="btn-primary">
                تسوق الآن
                <ArrowRight size={18} className="mr-2" />
              </Link>
              <Link to="/contact" className="btn-secondary">
                تواصل معنا
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="md:w-1/2 order-1 md:order-2">
            <div className="relative">
              <div className="w-full h-64 md:h-96 overflow-hidden rounded-lg shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07"
                  alt="باقات زهور جميلة"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 p-4 bg-white rounded-lg shadow-lg hidden md:block">
                <p className="text-xl font-bold text-floral-green mb-2">خصم 20%</p>
                <p className="text-sm">على جميع الباقات لهذا الأسبوع</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 w-20 h-20 rounded-full bg-floral-pink/20 -z-10"></div>
      <div className="absolute bottom-10 left-10 w-32 h-32 rounded-full bg-floral-green/10 -z-10"></div>
    </section>
  );
};

export default Hero;
