import express from 'express';
import UserController from '../controllers/login.js';
import User from '../models/user.js';
import multer from 'multer';
import path from 'path';
import nodemailer from 'nodemailer';

const router = express.Router();

// Create nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false // Bypass verification (caution, for testing only)
    }
});

// Set up multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/images'); // Destination folder for uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Use the original file name
    }
});

const upload = multer({ storage: storage });

router.post('/register', upload.single('image'), UserController.RegisterUser);
router.post('/login', UserController.LoginUser);
router.post('/update-location', UserController.UpdateLocation);
router.post('/delete-user', UserController.DeleteUser);
router.post('/update-user', UserController.UpdateUser);

router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error while fetching users details' });
    }
});

router.get('/users/:userid', async (req, res) => {
    try {
        const userid = req.params.userid;
        const user = await User.findOne({ userid });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error while fetching particular user details" });
    }
});

router.post('/send', async (req, res) => {
    try {
        const { email } = req.body;

        // Check if email exists in the database
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'Email not found' });
        }

        const sendOtp = Math.floor(1000 + Math.random() * 9000);

        const mailOptions = {
            from: 'monuathul23@gmail.com',
            to: email,
            subject: 'Password Reset',
            text: `Dear ${user.username},\n\nYou have requested to reset your password. Your OTP is ${sendOtp}. Please enter this OTP to reset your password.\n\nRegards,\nYour Prime Fresh Limited`
        };
    
        // Send email
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.error(error);
                return res.status(500).json({ message: 'Error sending email' });
            } else {
                // Save the OTP in user document or any other suitable place for comparison
                user.otp = sendOtp;
                user.save();
                return res.status(201).json({ message: 'OTP sent successfully to email' });
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/verify-otp', async (req, res) => {
    try {
        const { email, enteredOtp } = req.body;

        // Check if email exists in the database
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'Email not found' });
        }

        // Check if the entered OTP matches the OTP stored in the user's document
        if (enteredOtp !== user.otp) {
            return res.status(400).json({ message: 'Incorrect OTP' });
        }

        // Clear the OTP from the user's document after successful verification
        user.otp = '';
        await user.save();

        return res.status(200).json({ message: 'OTP verification successful' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/change-password', async (req, res) => {
    try {
        const { email, newPassword } = req.body;

        // Check if email exists in the database
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the user's password
        user.password = newPassword;
        await user.save();

        return res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;



