import express from 'express'
import Submodule from '../models/submodule.js'
import SubmoduleController from '../controllers/submodule.js'

const router = express.Router();

router.post('/add-submodule', SubmoduleController.AddSubmodule)

router.get('/submodules', async (req, res) => {
    try {
        const submodules = await Submodule.find();
        res.status(200).json(submodules)
    } catch (error) {
        res.status(500).json({ message: 'Error while submodule details.' });
    }
})



export default router