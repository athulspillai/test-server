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
    }
}

export default LeadserveyonlineService