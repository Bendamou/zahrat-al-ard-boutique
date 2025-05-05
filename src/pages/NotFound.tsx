
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-floral-cream py-12">
      <div className="text-center max-w-md px-4">
        <h1 className="text-6xl font-amiri font-bold mb-4 text-floral-green">404</h1>
        <p className="text-2xl font-amiri text-gray-700 mb-6">الصفحة غير موجودة</p>
        <p className="text-gray-600 mb-8">
          عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
        </p>
        <Link 
          to="/" 
          className="btn-primary"
        >
          العودة إلى الرئيسية
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
