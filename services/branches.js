import Branches from "../models/branches.js";

const BranchesService = {
    AddBranch: (details) => {
        return new Promise(async (resolve, reject) => {
            try {
                const branches = await Branches.create(details)
                resolve(branches)
            } catch (err) {
                reject({
                    status: 500,
                    message: "Something Went Wrong"
                })
            }
        })
    },

    UpdateBranch: async (branchid, newBranchName) => {
        try {
            const updatedBranch = await Branches.findOneAndUpdate(
                { branchid },
                { $set: { branchname: newBranchName } },
                { new: true }
            );
            if (!updatedBranch) {
                throw { status: 404, message: 'Branch not found.' }
            }
            return updatedBranch;
        } catch (error) {
            throw { status: 500, message: 'Error while updating branch.' };
        }
    },

    DeleteBranch: async (branchid) => {
        try {
            const deleteBranch = await Branches.findOneAndDelete({ branchid })
            if (!deleteBranch) {
                throw {
                    status: 404,
                    message: 'Branch not found'
                };
            }
            return deleteBranch
        } catch (error) {
            throw {
                status: 500,
                message: 'Error while deleting branch.'
            };
        }
    }
}

export default BranchesService;


