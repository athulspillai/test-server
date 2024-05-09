import LeadserveyonlineService from "../services/leadserveyonline.js";

const LeadserveyonlineController = {
    AddLeadserveyonline: async (req, res) => {
        try {
            const response = await LeadserveyonlineService.AddLeadserveyonline(req?.body)
            console.log(response);
            res.status(201).json({ message: 'Leadserveyonline is added successfully' })
        } catch (error) {
            console.error('Error while Leadserveyonline form adding', error?.message || error);
            res.status(error?.status || 500).json({ message: error?.message || error })
        }
    },

    DeleteLeadserveyonline: async (req, res) => {
        const { leadserveyonlineid } = req.body;
        try {
            await LeadserveyonlineService.DeleteLeadserveyonline(leadserveyonlineid);
            res.status(200).json({ message: 'Leadserveyonline is deleted' })
        } catch (error) {
            console.error('Error while deleting Leadserveyonline:', error);
            res.status(error?.status || 500).json({ message: error?.message || 'Errro while deleting leadservey' })
        }
    },

    DeleteAllLeadserveyonline: async (req, res) => {
        try {
            await LeadserveyonlineService.DeleteAllLeadserveyonline();
            res.status(200).json({ message: 'All leadserveyonline deleted successfully' })
        } catch (error) {
            console.error('Error while deleting all leadserveyonline:', error);
            res.status(error.status || 500).json({ message: error.message || 'Error while deleting all leadserveys' });
        }
    },

    UpdateLeadserveyonline: async (req,res) => {
        try{
            const { leadserveyonlineid, newCommunication, newBizName, newFName, newLName, newMobNum, newEmailId, newState, newCity, newArea} = req.body;
            const updatedLeadserveyonline = await LeadserveyonlineService.UpdateLeadserveyonline(leadserveyonlineid, newCommunication, newBizName, newFName, newLName, newMobNum, newEmailId, newState, newCity, newArea)
            res.status(200).json({ message: 'Leadserveyonline is updated', leadonline: updatedLeadserveyonline});
        } catch (error) {
            console.error('Error while updating leadserveyonline:', error);
            res.status(error?.status || 500).json({ message: error?.message || 'Error while updating leadserveyonline'})
        }
    },
}

export default LeadserveyonlineController