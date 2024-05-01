import express from 'express';
import Leadserveyonline from '../models/leadserveyonline.js';
import LeadserveyonlineController from '../controllers/leadserveyonline.js';

const router = express.Router();

router.post('/add-leadserveyonline', LeadserveyonlineController.AddLeadserveyonline)
router.post('/delete-leadserveyonline', LeadserveyonlineController.DeleteLeadserveyonline)
router.post('/delete-all-leadserveyonline', LeadserveyonlineController.DeleteAllLeadserveyonline)

router.get('/leadserveyonline', async (req, res) => {
    try {
        const leadserveyonline = await Leadserveyonline.find();
        res.status(200).json(leadserveyonline)
    } catch (error) {
        res.status(500).json({ message: 'Error while leadserveyonline details.' })
    }
})

router.get('/leadserveyonline/:leadserveyonlineid', async (req, res) => {
    try {
        const leadserveyonlineid = req.params.leadserveyonlineid
        const leadserveyonline = await Leadserveyonline.findOne({ leadserveyonlineid });
        if (!leadserveyonline) {
            return res.status(404).json({ message: "Leadserveyonline not found." })
        }
        res.status(200).json(leadserveyonline)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error while fetching leadserveyonline details." });
    }
})

export default router