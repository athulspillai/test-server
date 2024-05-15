import ProductService from "../services/product.js";
import Products from "../models/products.js";

const ProductController = {
    // AddProduct: async (req, res) => {
    //     try {
    //         const response = await ProductService.AddProduct(req?.body)

    //         console.log(response)

    //         res.status(201).json({ message: 'Product is added Successfully' })
    //     } catch (error) {
    //         console.error('Error while product adding:', error?.message || error);
    //         res.status(error?.status || 500).json({ message: error?.message || error })
    //     }
    // },

    AddProduct: async (req, res) => {
        try {
            // Extract form data including product image and additional fields
            const { productid, productcode, productname, categoryid, subcategoryid, packingid} = req.body;
            const productImage = req.file.path; // Path to the uploaded product image

            // Create a new product
            const newProduct = new Products({ productid, productcode, productname, categoryid, subcategoryid, packingid, productImage });

            // Save product to database
            await newProduct.save();

            res.status(201).json({ message: 'Product added successfully.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error adding product.' });
        }
    },

    UpdateProduct: async (req, res) => {
        try {
          const { productid, newProductName } = req.body;
          const updatedProduct = await ProductService.UpdateProduct(productid, newProductName)
          res.status(200).json({ message: 'Product is updated', product: updatedProduct });
        } catch (error) {
          console.error('Error while updating product:', error);
          res.status(error.status || 500).json({ message: error.message || 'Internal Server Error' });
        }
      },

    DeleteProduct: async (req, res) => {
        const { productid } = req.body;
        try {
            await ProductService.DeleteProduct(productid);
            res.status(200).json({ message: 'Product is deleted' });
        } catch (error) {
            console.error('Error while deleting product:', error);
            res.status(error?.status || 500).json({ message: error?.message || 'Error while deleting product' });
        }
    },
}

export default ProductController