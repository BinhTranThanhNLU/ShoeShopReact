import { useEffect, useState } from "react";
import Hero from "../components/HomeComponent/Hero";
import ListProductHome from "../components/HomeComponent/ListProductHome";
import PromoCard from "../components/HomeComponent/PromoCard";
import type { ProductModel } from "../models/ProductModel";
import { SpinningLoading } from "../components/utils/SpinningLoading";
import { ErrorMessage } from "../components/utils/ErrorMessage";
import { productApi } from "../api/productApi";

const HomePage = () => {
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productApi.getAllProducts();
        setProducts(data);
      } catch (error: any) {
        setHttpError(error.message || "Error fetching products");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) return <SpinningLoading />;
  if (httpError) return <ErrorMessage message={httpError} />;

  return (
    <main className="main">
      <Hero />
      <PromoCard />
      <ListProductHome products={products} />
    </main>
  );
};

export default HomePage;
