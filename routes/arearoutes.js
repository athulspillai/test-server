import express from 'express'
import Area from '../models/area.js'
import Areacontroller from '../controllers/area.js'

const router = express.Router();

router.post('/add-area', Areacontroller.AddArea)
router.post('/update-area', Areacontroller.UpdateArea)
router.post('/delete-area', Areacontroller.DeleteArea)

router.get('/areas', async ( req, res) => {
    try {
        const area  = await Area.find()
        res.status(200).json(area)
    } catch (error) {
        res.status(500).json({ message: 'Error while retrieving area' })
    }
})

router.get('/viewarea/:areaid', async (req, res) => {
    const { areaid } = req.params
    try {
        const area = await Area.findOne({ areaid })

        if(!area) {
            return res.status(404).json({ message: 'area is not found'})
        }

        res.status(200).json(area)
    } catch (error) {
        res.status(500).json({ message: 'Error while retrieving area.' })
    }
})

router.get('/area/:cityid', async (req,res) => {
    const { cityid } = req.params
    try {
        const area = await Area.find({ cityid })
        res.status(200).json(area)
    } catch (error) {
        res.status(500).json({ message: 'Error while retrieving areas for the given cityid.' });
    }
})

export default router