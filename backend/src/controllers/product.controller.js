import Product from "../../models/product.model.js"
import mongoose from "mongoose";

//controller for getting the products.
export async function getAllProducts(_, res) {   //if we are not using a parameter then we can skip thme using _. here req was skipped.
    try {
       const products = await Product.find({});   //{} inside means fetch all the products that we have.
       res.status(200).json({success: true, data: products});
    } catch (error) {
        console.log("Error in fetching products", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
}

//controller for getting a specific product using id.
export async function getProductById(req, res) {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        console.log("Error in Fetch product", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
}

//controller for adding a product.
export async function addProduct(req, res) {
    const product = req.body; //user will send this data. (from Postman or using the website when frontend is created).

    if(!product.name || !product.price || !product.image) {    //if its a post request from the user and these fields arent there/provided then run the code beolw
        return res.status(400).json({ success: false, message: "Please provide all fields"});
    }

    const newProduct = new Product(product);   //make a new model Product from the data(product) provided by the user.

    try {   
        await newProduct.save();    //this is gonna save the model to the database.
        res.status(201).json({ success: true, data: newProduct, message: "Product created successfully" });   // 201 means something created successfully and data: newProduct means we(user) created this successfully.
    } catch (error) {
        console.log("Error in Create product:", error.message);
        res.status(500).json({ success: false, message: "Server Error" })   //used 500 cuz this error would be Internal Server Error.
    }
}

//controller for updating a specific product using id.
export async function updateProduct(req, res) {
    const {id} = req.params
    const product = req.body

    if(!mongoose.Types.ObjectId.isValid(id)){   //to handle 404 error. if the id doesnt match.
        return res.status(404).json({ success:false, message: "Invalid Product Id"})
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new:true});
        res.status(200).json({success: true, data: updatedProduct, message: "Product updated successfully"});
    } catch (error) {
        console.log("Error in Fetch product", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
}

//controller for deleting a specific product using id.
export async function deleteProduct(req, res) {
    const {id} = req.params      //destrutured id from the URL.

    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message:"Product Deleted"});
    } catch (error) {
        console.log("Error in Deleting product", error.message);
        res.status(500).json({success: false, message: "Internal Server Error."});
    }
}