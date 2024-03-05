import express from 'express'
import UserController from '../controllers/login.js';
import User from '../models/user.js';


const router = express.Router();

router.post('/register', UserController.RegisterUser)
router.post('/login', UserController.LoginUser)
router.post('/update-location', UserController.UpdateLocation)

router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: 'Error while users details'})
    }
})

export default router

