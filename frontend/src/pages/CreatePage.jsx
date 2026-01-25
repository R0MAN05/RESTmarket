import { useState } from "react";
import { Link, useNavigate } from "react-router";

import { ArrowLeftIcon } from "lucide-react";
import { useProductStore } from "../store/product";
import toast from "react-hot-toast";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { createProduct } = useProductStore();

  const handleAddProduct = async (e) => {
    e.preventDefault();
    
    if (!newProduct.name.trim() || !newProduct.price || !newProduct.image.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    const { success, message } = await createProduct(newProduct);

    if (!success) {
      toast.error(message);
    } else {
      toast.success(message);
      setNewProduct({
        name: "",
        price: "",
        image: "",
      });
      setTimeout(() => navigate("/"), 1500);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-base-100 py-6 md:py-8 lg:py-12">
      <div className="container mx-auto px-3 sm:px-4 md:px-6">
        <div className="w-full max-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-ghost btn-sm sm:btn-md mb-4 md:mb-6">
            <ArrowLeftIcon className="size-4 sm:size-5" />
            <span className="text-sm sm:text-base">Back to Products</span>
          </Link>

          <div className="card border border-primary bg-base-200 shadow-lg">
            <div className="card-body p-4 sm:p-6 md:p-8">
              <h2 className="card-title text-xl sm:text-2xl md:text-3xl mb-4 md:mb-6 font-bold text-primary">Add New Product</h2>

              <form className="space-y-4 md:space-y-5">
                <div className="form-control">
                  <label className="label py-2">
                    <span className="label-text text-sm sm:text-base">Product Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter product name"
                    className="input input-bordered input-sm sm:input-md w-full text-sm sm:text-base"
                    value={newProduct.name}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, name: e.target.value })
                    }
                    disabled={loading}
                  />
                </div>

                <div className="form-control">
                  <label className="label py-2">
                    <span className="label-text text-sm sm:text-base">Product Price</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Enter price"
                    className="input input-bordered input-sm sm:input-md w-full text-sm sm:text-base"
                    value={newProduct.price}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, price: e.target.value })
                    }
                    disabled={loading}
                  />
                </div>

                <div className="form-control">
                  <label className="label py-2">
                    <span className="label-text text-sm sm:text-base">Product Image URL</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter image URL"
                    className="input input-bordered input-sm sm:input-md w-full text-sm sm:text-base"
                    value={newProduct.image}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, image: e.target.value })
                    }
                    disabled={loading}
                  />
                </div>

                <div className="card-actions justify-end pt-2 md:pt-4">
                  <button
                    type="submit"
                    className="btn btn-primary btn-sm sm:btn-md"
                    onClick={handleAddProduct}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="loading loading-spinner loading-sm"></span>
                        Adding...
                      </>
                    ) : (
                      "Add Product"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
