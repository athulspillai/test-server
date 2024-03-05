import express from 'express'
import Subcategory from '../models/subcategory.js';
import Products from '../models/products.js';
import ProductController from '../controllers/product.js';
const router = express.Router();

router.post('/add-products', ProductController.AddProduct)
router.post('/update-products', ProductController.UpdateProduct)
router.post('/delete-products', ProductController.DeleteProduct)

router.get('/products', async (req, res) => {
    try {
        const products = await Products.find();
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ message: 'Error while products category.' });
    }
})

router.get('/subcategory/:categoryid', async (req, res) => {
    const { categoryid } = req.params;

    try {
        const subcategories = await Subcategory.find({ categoryid });
        res.status(200).json(subcategories);
    } catch (error) {
        res.status(500).json({ message: 'Error while retrieving subcategory for the given categoryid.' });
    }
});

export default router;


