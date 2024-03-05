import Branch from "../models/branch.js";

const BranchService = {
    AddBranch: (details) => {
        return new Promise(async (resolve, reject) => {
            try {
                const branch = await Branch.create(details)
                resolve(branch)
            } catch (err) {
                reject({
                    status: 500,
                    message: "Something Went Wrong"
                })
            }
        })
    }
}

export default BranchService