import express from 'express';
import Gtbuyer from '../models/gtbuyer.js';
import GtbuyerController from '../controllers/gtbuyer.js';

const router = express.Router();

router.post('/add-gtbuyer', GtbuyerController.AddGtbuyer)
// router.post('/update-gtbuyer', GtbuyerController.UpdateGtbuyer)
// router.post('/delete-gtbuyer', GtbuyerController.DeleteGtbuyer)

router.get('/gtbuyers', async (req, res) => {
    try {
        const gtbuyer = await Gtbuyer.find();
        res.status(200).json(gtbuyer)
    } catch (error) {
        res.status(500).json({ message: "Error while gtbuyer details."})
    }
})


export default router