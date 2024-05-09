import Leadserveyonline from "../models/leadserveyonline.js";

const LeadserveyonlineService = {
    AddLeadserveyonline: (details) => {
        return new Promise(async (resolve, reject) => {
            try {
                const leadserveyonline = await Leadserveyonline.create(details)
                resolve(leadserveyonline)
            } catch (err) {
                reject({
                    status: 500,
                    message: "Something Went Wrong"
                })
            }
        })
    },
    DeleteLeadserveyonline: async (leadonlineserveyid) => {
        try {
            const deleteLeadonlineservey = await Leadserveyonline.findOneAndDelete({ leadonlineserveyid })

            if (!deleteLeadonlineservey) {
                throw {
                    status: 404,
                    message: 'Leadonlineservey not found.'
                }
            }
            return deleteLeadonlineservey
        } catch (error) {
            throw {
                status: 500,
                message: 'Error while deleting Leadonlineservey'
            }
        }
    },
    DeleteAllLeadserveyonline: async () => {
        try {
            await Leadserveyonline.deleteMany({});
        } catch (error) {
            throw {
                status: 500,
                message: 'Error while deleting all Leadonlineservey'
            };
        }
    },

    UpdateLeadserveyonline: async (leadserveyonlineid, newCommunication, newBizName, newFName, newLName, newMobNum, newEmailId, newState, newCity, newArea) => {
        try {
            const updatedLeadserveyonline = await Leadserveyonline.findOneAndUpdate(
                { leadserveyonlineid },
                { $set: { Communication:newCommunication, BizName:newBizName, FName:newFName, LName:newLName, MobNum:newMobNum, EmailId:newEmailId, State:newState, City:newCity, Area:newArea}},
                { new: true}
            )
            if (!updatedLeadserveyonline){
                throw { status: 404, message: 'Leadserveyonline not found.'}
            }
            return updatedLeadserveyonline
        } catch (error) {
            throw { status:500, message: 'Error while updating Leadserveyonline'}
        }
    },
}

export default LeadserveyonlineService