import express from 'express'
import Branches from '../models/branches.js'
import BranchesController from '../controllers/branches.js'

const router = express.Router();

router.post('/add-branch', BranchesController.AddBranch)
router.post('/update-branch', BranchesController.UpdateBranch)
router.post('/delete-branch', BranchesController.DeleteBranch)

router.get('/branches', async (req, res) => {
    try {
        const branches = await Branches.find()
        res.status(200).json(branches)
    } catch (error) {
        res.status(500).json({ message: 'Error while retrieving branches' })
    }
})

router.get('/viewbranch/:branchid', async (req, res) => {
    const { branchid } = req.params
    try {
        const branch = await Branches.findOne({ branchid })

        if (!branch) {
            return res.status(404).json({ message: 'branch is not found' })
        }

        res.status(200).json(branch)
    } catch (error) {
        res.status(500).json({ message: 'Error while retrieving branch.' })
    }
})



export default router