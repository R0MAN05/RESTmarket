import React, { useState, useEffect } from "react";
import axios from "axios"

import ProductCard from "../components/ProductCard";
import ProductsNotFound from "../components/ProductsNoteFound";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/api/products");
        console.log(res.data);
        setProducts(res.data.data);
      } catch (error) {
        console.log("Error fetching products");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-base-100 py-6 md:py-8">
      <div className="container mx-auto px-3 sm:px-4 md:px-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl text-center font-bold text-primary mb-8">
          Current Products
        </h1>

        <div className="max-w-7xl mx-auto">
          {loading && (
            <div className="flex flex-col items-center justify-center py-12">
              <span className="loading loading-spinner loading-lg text-primary mb-4"></span>
              <p className="text-center text-base-content/70">Loading Products...</p>
            </div>
          )}

          {!loading && products.length === 0 && <ProductsNotFound />}

          {!loading && products.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} setProducts={setProducts} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
