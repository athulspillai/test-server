import User from "../models/user.js";
import jwt from 'jsonwebtoken';

const UserService = {
    RegisterUser: async (details) => {
        const { userid, username, password, email, roles, forms, reports } = details;

        try {
            // Check if the username already exists
            const existingUser = await User.findOne({ userid });
            if (existingUser) {
                return { status: 409, message: 'Username already exists.' };
            }

            // Create a new user
            const newUser = new User({ username, userid, password, email, roles, forms, reports });
            await newUser.save();

            return { status: 201, message: 'User registered successfully.' };
        } catch (error) {
            // Handle any errors during registration
            return { status: 500, message: 'Error registering user.' };
        }
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
            const { roles, template, modulegroupname, forms, reports, userid, hasUnreadMessages } = user;

            // Check for unread messages
            const unreadMessages = hasUnreadMessages || false;

            // Set last login time
            user.lastLogin = new Date();
            await user.save();

            // Set unread messages flag to false after checking
            user.hasUnreadMessages = false;
            await user.save();

            return { status: 200, token, roles, template, modulegroupname, forms, reports, userid, hasUnreadMessages: unreadMessages, message: 'Login successful.' };
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