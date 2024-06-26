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

    DeleteLeadservey: async (req, res) => {
        const { leadserveyid } = req.body;
        try {
            await LeadserveyService.DeleteLeadservey(leadserveyid);
            res.status(200).json({ message: 'Leadservey is deleted' })
        } catch (error) {
            console.error('Error while deleting Leadservey:', error);
            res.status(error?.status || 500).json({ message: error?.message || 'Errro while deleting leadservey' })
        }
    },
    DeleteAllLeadserveys: async (req, res) => {
        try {
            await LeadserveyService.DeleteAllLeadserveys();
            res.status(200).json({ message: 'All leadserveys deleted successfully' });
        } catch (error) {
            console.error('Error while deleting all leadserveys:', error);
            res.status(error.status || 500).json({ message: error.message || 'Error while deleting all leadserveys' });
        }
    },

    UpdateLeadservey: async (req, res) => {
        try {
            const { leadserveyid, newCustName, newSince,  newBizType, newBizCatge, newFName, newLName, newAddr1, newAddr2, newState, newCity, newArea, newPincode, newMobNum, newAltMobNum, newEmailId, newBizExp, newCurrAddSince, newBizHourFrom, newBizHourTo, newApproxQtyBuyinKg, newDaPurval, newKeyskus} = req.body;
            const updatedLeadservey = await LeadserveyService.UpdateLeadservey(leadserveyid, newCustName, newSince, newBizType, newBizCatge, newFName, newLName, newAddr1, newAddr2, newState, newCity, newArea, newPincode, newMobNum, newAltMobNum, newEmailId, newBizExp, newCurrAddSince, newBizHourFrom, newBizHourTo, newApproxQtyBuyinKg, newDaPurval, newKeyskus )
            res.status(200).json({ message: 'Leadservey is updated', lead: updatedLeadservey });
        } catch (error) {
            console.error('Error while updating leadservey:', error);
            res.status(error?.status || 500).json({ message: error?.message || 'Error while updating leadservey' });
        }
    }
}

export default LeadserveyController