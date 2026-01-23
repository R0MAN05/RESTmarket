import { Package } from "lucide-react";
import { Link } from "react-router";

const ProductsNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center">
      <div className="bg-primary/10 rounded-full p-8">
        <Package className="size-10 text-primary" />
      </div>
      <h3 className="text-2xl font-bold">No products yet</h3>
      <p className="text-base-content/70">
        Ready to add products? Create your first product to get started on your store.
      </p>
      <Link to="/create" className="btn btn-primary">
        Add the first product
      </Link>
    </div>
  );
};
export default ProductsNotFound;