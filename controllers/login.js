import UserService from "../services/login.js";

const UserController = {
    RegisterUser: async (req, res) => {
        try {
            const registrationDetails = req.body;
            const result = await UserService.RegisterUser(registrationDetails);

            res.status(result.status).json({ message: result.message });
        } catch (error) {
            // Handle other potential errors
            res.status(500).json({ message: 'Internal Server Error' });
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