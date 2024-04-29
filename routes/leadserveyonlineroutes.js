import express from 'express';
import Leadserveyonline from '../models/leadserveyonline.js';
import LeadserveyonlineController from '../controllers/leadserveyonline.js';

const router = express.Router();

router.post('/add-leadserveyonline', LeadserveyonlineController.AddLeadserveyonline)

router.get('/leadserveyonline', async (req,res) => {
    try {
        const leadserveyonline = await Leadserveyonline.find();
        res.status(200).json(leadserveyonline)
    } catch (error) {
        res.status(500).json({ message: 'Error while leadserveyonline details.'})
    }
})

export default router