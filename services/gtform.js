import Gtform from "../models/gtform.js";

const GtformService = {
    AddGtform: (details) => {
        return new Promise(async (resolve, reject) => {
            try {
                const gtform = await Gtform.create(details)
                resolve(gtform)
            } catch (err) {
                reject({
                    status:500,
                    message:"Something Went Wrong"
                })
            }
        })
    }
}

export default GtformService