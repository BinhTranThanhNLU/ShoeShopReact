// ===== Core React =====
import { useEffect } from "react";

// ===== Third-party UI libs =====
import { Swiper, SwiperSlide } from "swiper/react";

// ===== Animation / Effects =====
import AOS from "aos";
import "aos/dist/aos.css";

// ===== Lightbox / Zoom =====
import GLightbox from "glightbox";
import "glightbox/dist/css/glightbox.min.css";
import Drift from "drift-zoom";
import "drift-zoom/dist/drift-basic.css";

// ===== Counter =====
import PureCounter from "@srexi/purecounterjs";

// ===== UI Layout =====
import Header from "./components/HeaderAndFooter/Header";
import Footer from "./components/HeaderAndFooter/Footer";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

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
    <>
      <Header />
      <CategoryPage />
      <Footer />
    </>
   
  );
}

export default App;
