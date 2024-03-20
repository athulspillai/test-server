import express from 'express';
import Leadservey from '../models/leadservey.js';
import LeadserveyController from '../controllers/leadservey.js';

const router = express.Router();

router.post('/add-leadservey', LeadserveyController.AddLeadservey)
router.post('/delete-leadservey', LeadserveyController.DeleteLeadservey)
router.post('/delete-all-leadservey', LeadserveyController.DeleteAllLeadserveys)

router.get('/leadserveys', async (req, res) => {
    try {
        const leadservey = await Leadservey.find();
        res.status(200).json(leadservey)
    } catch (error) {
        res.status(500).json({ message: "Error while leadservey details." })
    }
})

// Your route handler (assuming it's part of your Express.js app)
router.get('/leadserveys/:leadserveyid', async (req, res) => {
    try {
        const leadserveyid = req.params.leadserveyid;
        // Assuming Leadservey is your Mongoose model for leadserveys
        const leadservey = await Leadservey.findOne({ leadserveyid });
        if (!leadservey) {
            return res.status(404).json({ message: "Leadservey not found." });
        }
        res.status(200).json(leadservey);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error while fetching leadservey details." });
    }
});



export default router