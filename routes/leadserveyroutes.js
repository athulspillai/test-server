import express from 'express';
import Leadservey from '../models/leadservey.js';
import LeadserveyController from '../controllers/leadservey.js';

const router = express.Router();

router.post('/add-leadservey', LeadserveyController.AddLeadservey)
router.post('/delete-leadservey', LeadserveyController.DeleteLeadservey)

router.get('/leadserveys', async (req, res) => {
    try {
        const leadservey = await Leadservey.find();
        res.status(200).json(leadservey)
    } catch (error) {
        res.status(500).json({ message: "Error while leadservey details." })
    }
})

export default router