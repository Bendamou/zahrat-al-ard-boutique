
import { Flower2 } from "lucide-react";
import WhatsAppButton from "../components/WhatsAppButton";

const About = () => {
  return (
    <main className="min-h-screen py-8">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-amiri font-bold mb-4 text-floral-green">من نحن</h1>
          <p className="max-w-2xl mx-auto text-gray-600">
            تعرف على قصتنا وشغفنا بالزهور والنباتات
          </p>
        </div>

        {/* Our Story */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <h2 className="section-title">قصتنا</h2>
              <p className="mb-4 text-gray-700">
                بدأت رحلة زهرة الأرض في عام 2015 كمشروع صغير يعبر عن شغفنا بالزهور وجمالها. كان هدفنا منذ البداية هو مشاركة ذوقنا الرفيع في تنسيق الزهور وتقديم باقات تعبر عن المشاعر المختلفة.
              </p>
              <p className="mb-4 text-gray-700">
                بعد سنوات من العمل والتطوير، أصبحنا اليوم من أشهر متاجر الزهور في المدينة، نخدم العملاء في مختلف المناسبات والاحتفالات.
              </p>
              <p className="text-gray-700">
                نحن نؤمن بأن كل باقة زهور تحمل قصة فريدة ورسالة مميزة، ونسعى دائمًا لإنشاء تصاميم استثنائية تدوم في الذاكرة.
              </p>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07" 
                alt="قصة زهرة الأرض" 
                className="rounded-lg shadow-md w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-12">
          <h2 className="section-title text-center mx-auto">قيمنا</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="bg-floral-cream p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-floral-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Flower2 className="text-floral-green" />
              </div>
              <h3 className="font-bold text-lg mb-2">الجودة</h3>
              <p className="text-gray-600">نختار أفضل الزهور الطازجة ونعتني بكل تفاصيل التنسيق والتغليف</p>
            </div>

            <div className="bg-floral-cream p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-floral-pink/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Flower2 className="text-floral-pink" />
              </div>
              <h3 className="font-bold text-lg mb-2">الإبداع</h3>
              <p className="text-gray-600">نبتكر تصاميم فريدة ومميزة تناسب كل مناسبة وذوق</p>
            </div>

            <div className="bg-floral-cream p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-floral-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Flower2 className="text-floral-green" />
              </div>
              <h3 className="font-bold text-lg mb-2">الشغف</h3>
              <p className="text-gray-600">نعمل بحب وشغف لإدخال السعادة إلى قلوب عملائنا</p>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="mb-12">
          <h2 className="section-title text-center mx-auto">فريقنا</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
            {[1, 2, 3, 4].map((member) => (
              <div key={member} className="bg-white rounded-lg overflow-hidden shadow-sm">
                <img 
                  src={`https://randomuser.me/api/portraits/women/${member + 20}.jpg`} 
                  alt="عضو الفريق" 
                  className="w-full h-64 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="font-bold font-amiri text-lg mb-1">سارة الخالدي</h3>
                  <p className="text-floral-pink">منسقة زهور</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <WhatsAppButton phoneNumber="+212706461139" message="مرحبا، أود التواصل معكم." />
    </main>
  );
};

export default About;
