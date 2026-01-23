import React from 'react';
import { Trash2, Calendar, Image as ImageIcon } from 'lucide-react';
import { useProductStore } from '../store/product';
import { Link } from 'react-router';
import toast from 'react-hot-toast';

const ProductCard = ({ product, setProducts }) => {
  const { deleteProduct } = useProductStore();
  const [imageError, setImageError] = React.useState(false);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }
    
    const { success, message } = await deleteProduct(product._id);
    if (success) {
      toast.success(message);
      setProducts((prevProducts) => prevProducts.filter((p) => p._id !== product._id));
    } else {
      toast.error(message);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className="card bg-base-200 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col">
      <figure className="px-4 pt-4 h-48 overflow-hidden bg-base-300 rounded-t-lg flex items-center justify-center">
        {isValidUrl(product.image) && !imageError ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-base-300 text-base-content/50 rounded-lg">
            <ImageIcon className="size-12 mb-2 opacity-50" />
            <span className="text-xs text-center px-2">No Valid Image</span>
          </div>
        )}
      </figure>
      <div className="card-body p-4 sm:p-6 flex flex-col flex-grow">
        <h2 className="card-title text-lg sm:text-xl line-clamp-2 mb-2">{product.name}</h2>
        
        <div className="mb-3">
          <p className="text-lg sm:text-xl font-bold text-primary">${parseFloat(product.price).toFixed(2)}</p>
        </div>

        <div className="divider my-2"></div>

        <div className="space-y-1 text-xs sm:text-sm text-base-content/70 mb-4 flex-grow">
          <div className="flex items-center gap-2">
            <Calendar className="size-3 sm:size-4 flex-shrink-0" />
            <span>Added: {formatDate(product.createdAt)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="size-3 sm:size-4 flex-shrink-0" />
            <span>Updated: {formatDate(product.updatedAt)}</span>
          </div>
        </div>

        <div className="card-actions justify-between gap-2 pt-2">
          <Link to={`/product/${product._id}`} className="btn btn-primary btn-sm sm:btn-md flex-1">
            View Details
          </Link>
          <button
            onClick={handleDelete}
            className="btn btn-error btn-sm sm:btn-md"
          >
            <Trash2 className="size-4 sm:size-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;