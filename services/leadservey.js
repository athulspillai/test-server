import Leadservey from "../models/leadservey.js";

const LeadserveyService = {
    AddLeadservey: (details) => {
        return new Promise(async (resolve, reject) => {
            try {
                const leadservey = await Leadservey.create(details)
                resolve(leadservey)
            } catch (err) {
                reject({
                    status: 500,
                    message: "Something Went Wrong"
                })
            }
        })
    },
    DeleteLeadservey: async (leadserveyid) => {
        try {
            const deleteLeadservey = await Leadservey.findOneAndDelete({ leadserveyid })

            if (!deleteLeadservey) {
                throw {
                    status: 404,
                    message: 'Leadservey not found.'
                }
            }
            return deleteLeadservey
        } catch (error) {
            throw {
                status: 500,
                message: 'Error while deleting Leadservey'
            }
        }
    },
    DeleteAllLeadserveys: async () => {
        try {
            await Leadservey.deleteMany({});
        } catch (error) {
            throw {
                status: 500,
                message: 'Error while deleting all Leadserveys'
            };
        }
    }
}

export default LeadserveyService