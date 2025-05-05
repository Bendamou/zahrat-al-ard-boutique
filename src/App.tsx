
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
import HomeAdmin from "./pages/admin/HomeAdmin";
import AboutAdmin from "./pages/admin/AboutAdmin";
import ContactAdmin from "./pages/admin/ContactAdmin";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const queryClient = new QueryClient();

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
            <Route path="home" element={<HomeAdmin />} />
            <Route path="about" element={<AboutAdmin />} />
            <Route path="contact" element={<ContactAdmin />} />
          </Route>

          {/* Public Routes */}
          <Route path="/" element={
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <div className="flex-grow">
                <Index />
              </div>
              <Footer />
            </div>
          } />
          
          <Route path="/products" element={
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <div className="flex-grow">
                <Products />
              </div>
              <Footer />
            </div>
          } />
          
          <Route path="/products/:id" element={
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <div className="flex-grow">
                <ProductDetail />
              </div>
              <Footer />
            </div>
          } />
          
          <Route path="/about" element={
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <div className="flex-grow">
                <About />
              </div>
              <Footer />
            </div>
          } />
          
          <Route path="/contact" element={
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <div className="flex-grow">
                <Contact />
              </div>
              <Footer />
            </div>
          } />
          
          <Route path="*" element={
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <div className="flex-grow">
                <NotFound />
              </div>
              <Footer />
            </div>
          } />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
