import Gtbuyer from "../models/gtbuyer.js";

const GtbuyerService = {
    AddGtbuyer: (details) => {
        return new Promise(async (resolve, reject) => {
            try {
                const gtbuyer = await Gtbuyer.create(details)
                resolve(gtbuyer)
            } catch (err) {
                reject({
                    status: 500,
                    message: "Something Went Wrong"
                })
            }
        })
    },
}

export default GtbuyerService