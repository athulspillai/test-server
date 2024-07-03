import BranchesService from "../services/branches.js";

const Branchescontroller = {
    AddBranch: async (req, res) => {
        try {
            const response = await BranchesService.AddBranch(req?.body)
            console.log(response);
        } catch (error) {
            console.error('Error while Branch adding:', error?.message || error);
            res.status(error?.status || 500).json({ message: error?.message || error })
        }
    },

    UpdateBranch: async (req,res) => {
        try {
            const { branchid, newBranchName} = req.body;
            const updatedBranch = await BranchesService.UpdateBranch(branchid, newBranchName)
            res.status(200).json({ message: 'Branch is updated', branch : updatedBranch})
        } catch (error) {
            console.error('Error while updating Branch', error);
            res.status(error.status || 500).json({ message: error.message || 'Internal Server Error' });
        }
    },      

    DeleteBranch: async (req,res) => {
        const { branchid } = req.body;
        try {
            await BranchesService.DeleteBranch(branchid);
            res.status(200).json({ message: 'Branch is deleted'}) 
        } catch (error) {
            console.error('Error while deleting Branch:', error);
            res.status(error?.status || 500).json({ message: error?.message || 'Error while deleting Branch' });
        }
    }
}

export default Branchescontroller