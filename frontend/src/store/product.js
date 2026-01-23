import {create} from "zustand";

export const useProductStore = create( (set) => ({
    products: [],
    setProduct: (products) => set({ products}),
    
    getProducts: async () => {
        try {
            const res = await fetch("/api/products");
            const data = await res.json();
            if (data.success) {
                set({ products: data.data });
                return { success: true, data: data.data };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            return { success: false, message: "Failed to fetch products" };
        }
    },

    getProductById: async (id) => {
        try {
            const res = await fetch(`/api/products/${id}`);
            const data = await res.json();
            if (data.success) {
                return { success: true, data: data.data };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            return { success: false, message: "Failed to fetch product" };
        }
    },

    createProduct: async (newProduct) => {
        if(!newProduct.name || !newProduct.price || !newProduct.image) {
            return {success: false, message: "Please fill in all fields."}
        }
        const res = await fetch("/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(newProduct)
        })
        const data = await res.json();
        set((state) => ({products: [...state.products, data.data]}))
        return {success: data.success, message: data.message || "Product created successfully"}
    },

    updateProduct: async (id, updatedProduct) => {
        try {
            const res = await fetch(`/api/products/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedProduct)
            });
            const data = await res.json();
            if (data.success) {
                set((state) => ({
                    products: state.products.map((product) =>
                        product._id === id ? data.data : product
                    )
                }));
            }
            return { success: data.success, data: data.data, message: data.message || "Product updated successfully" };
        } catch (error) {
            return { success: false, message: "Failed to update product" };
        }
    },

    deleteProduct: async (id) => {
        const res = await fetch(`/api/products/${id}`, {
            method: "DELETE"
        })
        const data = await res.json();
        set((state) => ({products: state.products.filter((product) => product._id !== id)}))
        return {success: data.success, message: data.message || "Product deleted successfully"}
    }
}));

