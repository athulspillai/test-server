import SubmoduleService from "../services/submodule.js";

const SubmoduleController = {
    AddSubmodule: async (req, res) => {
        try {
            const response = await SubmoduleService.AddSubmodule(req?.body)
            console.log(response)
            res.status(201).json({ message: 'Submodule is added Successfully' })
        } catch (error) {
            console.error('Error while submodule adding', error?.message || error);
            res.status(error?.status || 500).json({ message: error?.message || error })
        }
    }
}

export default SubmoduleController