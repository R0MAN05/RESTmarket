import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router";

import toast from "react-hot-toast";
import { ArrowLeftIcon, Trash2, Edit, Calendar, Image as ImageIcon } from "lucide-react";
import axios from "axios";
import { useProductStore } from "../store/product";

const ProductDetailPage = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [imageError, setImageError] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { deleteProduct } = useProductStore();

  const isValidImageUrl = (url) => {
    try {
      new URL(url);
      return url.length > 0;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/products/${id}`);
        setProduct(res.data.data);
        setEditData(res.data.data);
      } catch (error) {
        console.log("Error fetching product:", error);
        toast.error("Failed to fetch the product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    setIsDeleting(true);
    try {
      const { success, message } = await deleteProduct(id);
      if (success) {
        toast.success(message);
        setTimeout(() => navigate("/"), 1500);
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.log("Error deleting product:", error);
      toast.error("Failed to delete product");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!editData.name?.trim() || !editData.price || !editData.image?.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSaving(true);
    try {
      const res = await axios.put(`/api/products/${id}`, editData);
      if (res.data.success) {
        setProduct(res.data.data);
        setIsEditing(false);
        toast.success(res.data.message || "Product updated successfully");
      } else {
        toast.error("Failed to update product");
      }
    } catch (error) {
      console.log("Error saving product:", error);
      toast.error("Failed to update product");
    } finally {
      setIsSaving(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100">
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Link to="/" className="btn btn-primary">
            <ArrowLeftIcon className="size-5" />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 py-6 md:py-8">
      <div className="container mx-auto px-3 sm:px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <Link to="/" className="btn btn-ghost btn-sm sm:btn-md mb-6">
            <ArrowLeftIcon className="size-4 sm:size-5" />
            <span>Back to Products</span>
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Product Image */}
            <div className="flex items-center justify-center">
              <figure className="w-full">
                {product.image && isValidImageUrl(product.image) && !imageError ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-auto max-h-96 rounded-lg shadow-lg object-cover"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-full h-96 rounded-lg shadow-lg bg-base-300 flex flex-col items-center justify-center text-base-content/50">
                    <ImageIcon className="size-16 mb-3 opacity-50" />
                    <span className="text-sm text-center px-4">No valid image URL provided</span>
                  </div>
                )}
              </figure>
            </div>

            {/* Product Details */}
            <div className="flex flex-col justify-between">
              <div className="space-y-6">
                {!isEditing ? (
                  <>
                    <div>
                      <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                        {product.name}
                      </h1>
                      <p className="text-3xl font-bold text-primary">
                        ${parseFloat(product.price).toFixed(2)}
                      </p>
                    </div>

                    <div className="divider"></div>

                    <div className="space-y-3">
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-semibold text-sm">
                            Image URL
                          </span>
                        </label>
                        <p className="text-xs text-base-content/70 break-all bg-base-200 p-2 rounded">
                          {product.image}
                        </p>
                      </div>
                    </div>

                    <div className="divider"></div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-base-content/70">
                        <Calendar className="size-4 flex-shrink-0" />
                        <span>Created: {formatDate(product.createdAt)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-base-content/70">
                        <Calendar className="size-4 flex-shrink-0" />
                        <span>Updated: {formatDate(product.updatedAt)}</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <form onSubmit={handleSave} className="space-y-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">
                          Product Name
                        </span>
                      </label>
                      <input
                        type="text"
                        value={editData.name}
                        onChange={(e) =>
                          setEditData({ ...editData, name: e.target.value })
                        }
                        className="input input-bordered"
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">Price</span>
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={editData.price}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            price: parseFloat(e.target.value),
                          })
                        }
                        className="input input-bordered"
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">
                          Image URL
                        </span>
                      </label>
                      <input
                        type="text"
                        value={editData.image}
                        onChange={(e) =>
                          setEditData({ ...editData, image: e.target.value })
                        }
                        className="input input-bordered"
                        disabled={isSaving}
                      />
                    </div>

                    <div className="flex gap-2 pt-4">
                      <button 
                        type="submit" 
                        className="btn btn-primary flex-1"
                        disabled={isSaving}
                      >
                        {isSaving ? (
                          <>
                            <span className="loading loading-spinner loading-sm"></span>
                            Saving...
                          </>
                        ) : (
                          "Save Changes"
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsEditing(false);
                          setEditData(product);
                        }}
                        className="btn btn-outline flex-1"
                        disabled={isSaving}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Action Buttons */}
              {!isEditing && (
                <div className="flex flex-col gap-2 pt-6 md:pt-0">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn btn-warning btn-block"
                    disabled={isDeleting}
                  >
                    <Edit className="size-5" />
                    Edit Product
                  </button>
                  <button
                    onClick={handleDelete}
                    className="btn btn-error btn-block"
                    disabled={isDeleting}
                  >
                    {isDeleting ? (
                      <>
                        <span className="loading loading-spinner loading-sm"></span>
                        Deleting...
                      </>
                    ) : (
                      <>
                        <Trash2 className="size-5" />
                        Delete Product
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
