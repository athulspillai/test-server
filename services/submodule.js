import Submodule from "../models/submodule.js";

const SubmoduleService = {
    AddSubmodule: (details) => {
        return new Promise(async (resolve, reject) => {
            try {
                const submodule = await Submodule.create(details)
                resolve(submodule)
            } catch (err) {
                reject({
                    status: 500,
                    message: "Something Went Wrong"
                })
            }
        })
    }
}

export default SubmoduleService