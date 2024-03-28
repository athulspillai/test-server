import User from "../models/user.js";
import jwt from 'jsonwebtoken';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // specify the directory for storing uploaded images
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // generate unique filename
    }
});

const upload = multer({ storage: storage });

const UserService = {
    RegisterUser: async (req, res) => {
        upload.single('image')(req, res, async (err) => {
            if (err instanceof multer.MulterError) {
                // A Multer error occurred when uploading.
                return res.status(500).json({ status: 500, message: 'Error uploading image.' });
            } else if (err) {
                // An unknown error occurred when uploading.
                return res.status(500).json({ status: 500, message: 'Unknown error uploading image.' });
            }

            const { userid, username, password, email, roles, forms, reports } = req.body;
            const image = req.file; // Get the uploaded image

            try {
                // Check if the username already exists
                const existingUser = await User.findOne({ userid });
                if (existingUser) {
                    return res.status(409).json({ status: 409, message: 'Username already exists.' });
                }

                // Create a new user
                const newUser = new User({ username, userid, password, email, roles, forms, reports, image });
                await newUser.save();

                return res.status(201).json({ status: 201, message: 'User registered successfully.' });
            } catch (error) {
                // Handle any errors during registration
                return res.status(500).json({ status: 500, message: 'Error registering user.' });
            }
        });
    },

    LoginUser: async (username, password) => {
        try {
            const user = await User.findOne({ username });

            if (!user) {
                throw { status: 401, message: 'ID IS INCORRECT' };
            }

            if (user.password !== password) {
                throw { status: 401, message: 'PASSWORD IS INCORRECT' };
            }

            const token = jwt.sign({ userId: user._id }, 'your-secret-key');
            const { roles, template, modulegroupname, forms, reports, userid, lastLogin, hasUnreadMessages } = user;

            // Check for unread messages
            const unreadMessages = hasUnreadMessages || false;

            // Set last login time
            user.lastLogin = new Date();
            await user.save();

            // Set unread messages flag to false after checking
            user.hasUnreadMessages = false;
            await user.save();

            return { status: 200, token, roles, template, modulegroupname, forms, reports, userid, lastLogin, hasUnreadMessages: unreadMessages, message: 'Login successful.' };
        } catch (error) {
            throw { status: 500, message: 'Error logging in.' };
        }
    },

    UpdateLocation: async (token, location) => {
        try {
            // Verify the token
            const decoded = jwt.verify(token, 'your-secret-key');

            // Update the user's location in the database
            await User.findByIdAndUpdate(decoded.userId, { $set: { location } });

            return { status: 200, message: 'Location updated successfully.' };
        } catch (error) {
            throw { status: 500, message: 'Error updating location.' };
        }
    },
}

export default UserService