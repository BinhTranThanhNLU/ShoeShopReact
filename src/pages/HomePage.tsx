import Hero from "../components/HomeComponent/Hero";
import ListProductHome from "../components/HomeComponent/ListProductHome";
import PromoCard from "../components/HomeComponent/PromoCard";

const HomePage = () => {
  return (
    <main className="main">
      <Hero />
      <PromoCard />
      <ListProductHome />
    </main>
  );
};

export default HomePage;
