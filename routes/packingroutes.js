import express from 'express'
import Packing from '../models/packing.js';
import Products from '../models/products.js';
import PackingContoller from '../controllers/packing.js';
const router = express.Router();

router.post('/add-packing', PackingContoller.AddPacking)
router.post('/update-packing', PackingContoller.UpdatePacking)
router.post('/delete-packing', PackingContoller.DeletePacking)

router.get('/packing', async (req, res) => {
    try {
        const packing = await Packing.find();
        res.status(200).json(packing);
    } catch (error) {
        res.status(500).json({ message: 'Error while retrieving category.' });

    }
});

router.get('/viewpacking/:packingid', async (req, res) => {
    const { packingid } = req.params
    try {
        const packing = await Packing.findOne({ packingid });
        if (!packing) {
            return res.status(404).json({ message: 'subcategory not found.' })
        }
        res.status(200).json(packing)
    } catch (error) {
        res.status(500).json({ message: 'Error while retrieving subcategory.' })
    }
})

router.get('/check-associated-products/:packingid', async (req, res) => {
    const { packingid } = req.params;
    try {
        const hasProducts = await Products.exists({ packingid })
        res.json({ hasProducts })
    } catch (error) {
        console.error('Error checking associated products:', error);
        res.status(500).json({ message: 'Error while checking associated products' });
    }
})

export default  router;