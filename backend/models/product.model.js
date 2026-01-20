import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,  //for createdAt and updatedAt
  },
);

const Product = mongoose.model('Product', productSchema);   //says to mongoose to create a model/collection called 'Product' (in capital mongoose naming convention, mongoose would convert this into 'products' collections automatically), and you can look/check at productSchema for model.

export default Product;