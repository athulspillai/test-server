import UserService from "../services/login.js";
import User from "../models/user.js";

const UserController = {
    RegisterUser: async (req, res) => {
        try {
            // Extract form data including image
            const { username, userid, password, email, roles, forms, reports } = req.body;
            const image = req.file.path; // Path to the uploaded image

            // Create a new user
            const newUser = new User({ username, userid, password, email, roles, forms, reports, image });

            // Save user to database
            await newUser.save();

            res.status(201).json({ message: 'User registered successfully.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error registering user.' });
        }
    },

    LoginUser: async (req, res) => {
        try {
            const { username, password } = req.body;
            const result = await UserService.LoginUser(username, password);
    
    
            // Modify the response to include hasUnreadMessages
            res.status(result.status).json({ 
                token: result.token, 
                roles: result.roles, 
                template: result.template, 
                forms: result.forms, 
                reports: result.reports, 
                userid: result.userid,
                hasUnreadMessages: result.hasUnreadMessages, // Add hasUnreadMessages to the response
                lastLogin: result.lastLogin
                
            });
        } catch (error) {
            res.status(error.status).json({ message: error.message });
        }
    },
    

    UpdateLocation: async (req, res) => {
        try {
            const { token, location } = req.body;
            const result = await UserService.UpdateLocation(token, location);

            res.status(result.status).json({ message: result.message });
        } catch (error) {
            res.status(error.status).json({ message: error.message });
        }
    },
}

export default UserController