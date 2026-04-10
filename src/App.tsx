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
      <HomePage />
      <Footer />
    </>

  );
}

export default App;
