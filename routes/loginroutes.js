import express from 'express'
import UserController from '../controllers/login.js';
import User from '../models/user.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'uploads/images')); // Use absolute path
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Use the original file name
    }
});


const upload = multer({ storage: storage });

router.post('/register', upload.single('image'), UserController.RegisterUser);
router.post('/login', UserController.LoginUser)
router.post('/update-location', UserController.UpdateLocation)

router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: 'Error while users details' })
    }
})

router.get('/users/:userid', async (req,res) => {
    try {
        const userid = req.params.userid;

        const user = await User.findOne({ userid });
        if(!user) {
            return res.status(404).json({ message: "User not found"})
        }
        res.status(200).json(user)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error while fetching particular user details." });
    }
})



export default router

