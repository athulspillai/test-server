import express from 'express'
import City from '../models/city.js'
import Citycontroller from '../controllers/city.js'
import Area from '../models/area.js';

const router = express.Router();

router.post('/add-city', Citycontroller.AddCity)
router.post('/update-city', Citycontroller.UpdateCity)
router.post('/delete-city', Citycontroller.DeleteCity)

router.get('/cities', async (req, res) => {
    try {
        const cities = await City.find();
        res.status(200).json(cities)
    } catch (error) {
        res.status(500).json({ message: 'Error while retrieving city' })
    }
})

router.get('/viewcity/:cityid', async (req, res) => {
    const { cityid } = req.params
    try {
        const city = await City.findOne({ cityid });

        if (!city) {
            return res.status(404).json({ message: 'city not found.' })
        }

        res.status(200).json(city)
    } catch (error) {
        res.status(500).json({ message: 'Error while retrieving city.' })
    }
})

router.get('/check-associated-areas/:cityid', async (req, res) => {
    const { cityid } = req.params;
    try {
        const hasAreas = await Area.exists({ cityid });
        res.json({ hasAreas });
    } catch (error) {
        console.error('Error checking associated areas:', error);
        res.status(500).json({ message: 'Error while checking associated areas' });
    }
});

router.get('/viewcity/:cityid', async (req,res) => {
    const { cityid } = req.params
    try {
        const city = await City.findOne({ cityid })

        if (!city) {
            return res.status(404).json({ message: 'city not found'})
        }
        res.status(200).json(city)
    } catch (error) {
        res.status(500).json({ message: 'Error while retrieving city.' })
    }
})

router.get('/city/:stateid', async (req,res) => {
    const { stateid } = req.params
    try {
        const cities = await City.find({ stateid })
        res.status(200).json(cities)
    } catch (error) {
        res.status(500).json({ message: 'Error while retrieving city for the given stateid.' });
    }
})




export default router