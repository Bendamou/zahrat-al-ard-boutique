
import { Phone, Mail, Home } from "lucide-react";
import WhatsAppButton from "../components/WhatsAppButton";

const Contact = () => {
  return (
    <main className="min-h-screen py-8">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-amiri font-bold mb-4 text-floral-green">اتصل بنا</h1>
          <p className="max-w-2xl mx-auto text-gray-600">
            يسعدنا التواصل معكم والإجابة على استفساراتكم، يمكنكم الاتصال بنا مباشرة
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Contact Info */}
          <div className="md:w-1/3 bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-2xl font-amiri font-bold mb-6">معلومات التواصل</h2>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="bg-floral-green/10 p-3 rounded-full">
                  <Phone className="text-floral-green" size={24} />
                </div>
                <div>
                  <h3 className="font-bold">الهاتف</h3>
                  <p className="text-gray-600">+212706461139</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="bg-floral-pink/10 p-3 rounded-full">
                  <Mail className="text-floral-pink" size={24} />
                </div>
                <div>
                  <h3 className="font-bold">البريد الإلكتروني</h3>
                  <p className="text-gray-600">info@zahrat-alard.com</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="bg-floral-green/10 p-3 rounded-full">
                  <Home className="text-floral-green" size={24} />
                </div>
                <div>
                  <h3 className="font-bold">العنوان</h3>
                  <p className="text-gray-600">شارع الزهور، المدينة</p>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="mt-8 pt-8 border-t border-gray-100">
              <h3 className="font-bold text-xl mb-4">ساعات العمل</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-gray-600">السبت - الخميس</span>
                  <span>9:00 - 21:00</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">الجمعة</span>
                  <span>16:00 - 22:00</span>
                </li>
              </ul>
            </div>

            {/* Social Media */}
            <div className="mt-8 pt-8 border-t border-gray-100">
              <h3 className="font-bold text-xl mb-4">تابعنا على</h3>
              <div className="flex space-x-4 space-x-reverse">
                {/* Social icons would go here */}
                <div className="w-10 h-10 bg-blue-500 rounded-full"></div>
                <div className="w-10 h-10 bg-pink-500 rounded-full"></div>
                <div className="w-10 h-10 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:w-2/3 bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-2xl font-amiri font-bold mb-6">أرسل لنا رسالة</h2>
            
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block mb-2 font-medium">الاسم</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-floral-green"
                    placeholder="أدخل اسمك"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 font-medium">البريد الإلكتروني</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-floral-green"
                    placeholder="أدخل بريدك الإلكتروني"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block mb-2 font-medium">الموضوع</label>
                <input
                  type="text"
                  id="subject"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-floral-green"
                  placeholder="موضوع الرسالة"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block mb-2 font-medium">الرسالة</label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-floral-green"
                  placeholder="اكتب رسالتك هنا..."
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="btn-primary w-full"
              >
                إرسال الرسالة
              </button>
            </form>
          </div>
        </div>

        {/* Map */}
        <div className="mt-12">
          <h2 className="section-title">موقعنا</h2>
          <div className="w-full h-96 bg-gray-200 rounded-lg mt-4">
            {/* Map would be embedded here */}
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-gray-500">خريطة الموقع هنا</p>
            </div>
          </div>
        </div>
      </div>

      <WhatsAppButton phoneNumber="+212706461139" message="مرحبا، أود التواصل معكم." />
    </main>
  );
};

export default Contact;
