import LeadserveyService from "../services/leadservey.js";

const LeadserveyController = {
    AddLeadservey: async (req, res) => {
        try {
            const response = await LeadserveyService.AddLeadservey(req?.body)
            console.log(response)
            res.status(201).json({ message: 'Leadservey is added Successfully' })
        } catch (error) {
            console.error('Error while Leadservey form adding', error?.message || error);
            res.status(error?.status || 500).json({ message: error?.message || error })
        }
    },

    DeleteLeadservey: async (req,res) => {
        const { leadserveyid } = req.body;
        try {
            await LeadserveyService.DeleteLeadservey(leadserveyid);
            res.status(200).json({ message: 'Leadservey is deleted'})
        } catch (error) {
            console.error('Error while deleting Leadservey:', error);
            res.status(error?.status || 500).json({ message: error?.message || 'Errro while deleting leadservey'})
        }
    }
}

export default LeadserveyController