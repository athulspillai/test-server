import express from 'express'
import Branch from '../models/branch.js'
import BranchController from '../controllers/branch.js';

const router = express.Router();

router.post('/add-branch', BranchController.AddBranch)

router.get('/branches', async (req, res) => {
    try {
        const branches = await Branch.find();
        res.status(200).json(branches)
    } catch (error) {
        res.status(500).json({ message: 'Error while branch details.' });
    }
})


export default router