import Products from "../models/products.js"

const ProductService = {
    AddProduct: (details) => {
        return new Promise(async (resolve, reject) => {
            try {
                const products = await Products.create(details)

                resolve(products)
            } catch (err) {
                reject({
                    status: 500,
                    message: "Something Went Wrong"
                })
            }
        })
    },
    
    UpdateProduct: async (productid, newProductName) => {
        try {
            const updatedProduct = await Products.findOneAndUpdate(
                { productid },
                { $set: { productname: newProductName } },
                { new: true }
            );

            if (!updatedProduct) {
                throw { status: 404, message: 'Product not found.' };
            }

            return updatedProduct;
        } catch (error) {
            throw { status: 500, message: 'Error while updating product.' };
        }
    },

    DeleteProduct: async (productid) => {
        try {
            const deletedProduct = await Products.findOneAndDelete({ productid });

            if (!deletedProduct) {
                throw {
                    status: 404,
                    message: 'Product not found.'
                };
            }

            return deletedProduct;
        } catch (error) {
            throw {
                status: 500,
                message: 'Error while deleting product.'
            };
        }
    },

}

export default ProductService