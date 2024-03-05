import BranchService from "../services/branch.js";

const BranchController = {
    AddBranch: async (req, res) => {
        try {
            const response = await BranchService.AddBranch(req?.body)
            console.log(response)
            res.status(201).json({ message: 'Branch is added Successfully' })
        } catch (error) {
            console.error('Error while branch adding:', error?.message || error);
            res.status(error?.status || 500).json({ message: error?.message || error })
        }
    },
} 

export default BranchController