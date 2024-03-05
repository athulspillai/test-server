import express from 'express'
import Category from '../models/category.js'
import Subcategory from '../models/subcategory.js';
import CategoryContoller from '../controllers/category.js'
const router = express.Router();

router.post('/add-category', CategoryContoller.AddCategory)
router.post('/update-category', CategoryContoller.UpdateCategory)
router.post('/delete-category', CategoryContoller.DeleteCategory)

router.get('/check-associated-subcategories/:categoryid', async (req, res) => {
    const { categoryid } = req.params;

    try {
        const hasSubcategories = await Subcategory.exists({ categoryid });
        res.json({ hasSubcategories });
    } catch (error) {
        console.error('Error checking associated subcategories:', error);
        res.status(500).json({ message: 'Error while checking associated subcategories' });
    }
});

router.get('/category', async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Error while retrieving category.' });
    }
});


router.get('/viewcategory/:categoryid', async (req, res) => {
    const { categoryid } = req.params

    try {
        const category = await Category.findOne({ categoryid });

        if (!category) {
            return res.status(404).json({ message: 'category not found.' })
        }

        res.status(200).json(category)
    } catch (error) {
        res.status(500).json({ message: 'Error while retrieving category.' })
    }
})

export default router;