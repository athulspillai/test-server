import LeadserveyonlineService from "../services/leadserveyonline.js";

const LeadserveyonlineController = {
    AddLeadserveyonline: async (req,res) => {
        try {
            const response = await LeadserveyonlineService.AddLeadserveyonline(req?.body)
            console.log(response);
            res.status(201).json({ message: 'Leadserveyonline is added successfully'})
        } catch (error) {
            console.error('Error while Leadserveyonline form adding', error?.message || error);
            res.status(error?.status || 500).json({ message: error?.message || error })
        }
    }
}

export default LeadserveyonlineController