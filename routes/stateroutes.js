import express from 'express'
import State from '../models/state.js'
import StateController from '../controllers/state.js'
import City from '../models/city.js'

const router = express.Router()

router.post('/add-state', StateController.AddState)
router.post('/update-state', StateController.UpdateState)
router.post('/delete-state', StateController.DeleteState)

router.get('/states', async (req, res) => {
    try {
        const states = await State.find();
        res.status(200).json(states)
    } catch (error) {
        res.status(500).json({ message: 'Error while retrieving state.' });
    }
})

router.get('/check-associated-cities/:stateid', async (req, res) => {
    const { stateid } = req.params;
    try {
        const hasCities = await City.exists({ stateid });
        res.json({ hasCities })
    } catch (error) {
        console.error('Error checking associated cities:', error);
        res.status(500).json({ message: 'Error while checking associated cities' });
    }
})

router.get('/viewstate/:stateid', async (req, res) => {
    const { stateid } = req.params
    try {
        const state = await State.findOne({ stateid })

        if (!state) {
            return res.status(404).json({ message: 'state not found' })
        }
        res.status(200).json(state)
    } catch (error) {
        res.status(500).json({ message: 'Error while retrieving state.' })
    }
})

export default router