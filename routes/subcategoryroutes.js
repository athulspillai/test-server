import express from 'express';
import Subcategory from '../models/subcategory.js';
import SubcategoryController from '../controllers/subcategory.js';
const router = express.Router();

router.post('/add-subcategory', SubcategoryController.AddSubcategory)
router.post('/update-subcategory', SubcategoryController.UpdateSubcategory)
router.post('/delete-subcategory', SubcategoryController.DeleteSubcategory)

router.get('/subcategory', async (req, res) => {
    try {
        const subcategories = await Subcategory.find();
        res.status(200).json(subcategories);
    } catch (error) {
        res.status(500).json({ message: 'Error while retrieving subcategory' })
    }
})

router.get('/viewsubcategory/:subcategoryid', async (req, res) => {
    const { subcategoryid } = req.params

    try {
        const subcategory = await Subcategory.findOne({ subcategoryid });

        if (!subcategory) {
            return res.status(404).json({ message: 'subcategory not found.' })
        }

        res.status(200).json(subcategory)
    } catch (error) {
        res.status(500).json({ message: 'Error while retrieving subcategory.' })
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