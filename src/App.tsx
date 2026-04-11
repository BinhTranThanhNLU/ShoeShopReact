// ===== Core React =====
import { useEffect } from "react";

// ===== Animation / Effects =====
import AOS from "aos";
import "aos/dist/aos.css";

// ===== Lightbox / Zoom =====
import "glightbox/dist/css/glightbox.min.css";
import "drift-zoom/dist/drift-basic.css";

// ===== UI Layout =====
import Header from "./components/HeaderAndFooter/Header";
import Footer from "./components/HeaderAndFooter/Footer";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CategoryPage from "./pages/CategoryPage";
import ProductDetailPage from "./pages/ProductDetailPage";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-in-out",
      once: true,
      offset: 50,
    });
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/category/:id" element={<CategoryPage />} />
        <Route path="/product-detail/:id" element={<ProductDetailPage />} />
        
      </Routes>
      <Footer />
    </BrowserRouter>

  );
}

export default App;
