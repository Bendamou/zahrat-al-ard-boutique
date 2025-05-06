
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// Admin Pages
import Admin from "./pages/Admin";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import ProductsAdmin from "./pages/admin/ProductsAdmin";
import CategoriesAdmin from "./pages/admin/CategoriesAdmin";
import MessagesAdmin from "./pages/admin/MessagesAdmin";
import ImagesAdmin from "./pages/admin/ImagesAdmin";
import ThemeAdmin from "./pages/admin/ThemeAdmin";
import LanguagesAdmin from "./pages/admin/LanguagesAdmin";
import HomeAdmin from "./pages/admin/HomeAdmin";
import AboutAdmin from "./pages/admin/AboutAdmin";
import ContactAdmin from "./pages/admin/ContactAdmin";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const queryClient = new QueryClient();

// Layout component for public pages
const PublicLayout = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <div className="flex-grow">
      <Outlet />
    </div>
    <Footer />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin" element={<Admin />}>
            <Route path="dashboard" element={<DashboardAdmin />} />
            <Route path="products" element={<ProductsAdmin />} />
            <Route path="categories" element={<CategoriesAdmin />} />
            <Route path="messages" element={<MessagesAdmin />} />
            <Route path="images" element={<ImagesAdmin />} />
            <Route path="home" element={<HomeAdmin />} />
            <Route path="about" element={<AboutAdmin />} />
            <Route path="contact" element={<ContactAdmin />} />
            <Route path="theme" element={<ThemeAdmin />} />
            <Route path="languages" element={<LanguagesAdmin />} />
          </Route>

          {/* Public Routes - with simplified layout */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
