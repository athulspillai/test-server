import express from 'express'
import Gtform from '../models/gtform.js'
import GtformController from '../controllers/gtform.js';

const router = express.Router();

router.post('/add-gtform', GtformController.AddGtform)

router.get('/gtforms', async (req, res) => {
    try {
        const gtform = await Gtform.find()
        res.status(200).json(gtform)
    } catch (error) {
        res.status(500).json({ message: "Error while gtform details." })
    }
})

export default router