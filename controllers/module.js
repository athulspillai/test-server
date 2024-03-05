import ModuleService from "../services/module.js";

const ModuleController = {
    AddModule: async (req, res) => {
        try {
            const response = await ModuleService.AddModule(req?.body)
            console.log(response)
            res.status(201).json({ message: 'Module is added Successfully'})
        } catch (error) {
            console.error('Error while module adding',error?.message || error);
            res.status(error?.status || 500).json({ message: error?.message || error })
        }
    },

    UpdateModule: async (req, res) => {
        try {
            const { moduleid, newModuleName } = req.body;
            const updatedModule = await ModuleService.UpdateModule(moduleid, newModuleName)
            res.status(200).json({ message: 'Module is updated', module: updatedModule });
        } catch (error) {
            console.error('Error while updating module:', error);
            res.status(error.status || 500).json({ message: error.message || 'Internal Server Error' });
        }
    },

    DeleteModule: async (req, res) => {
        const { moduleid } = req.body;
        try {
            await ModuleService.DeleteModule(moduleid);
            res.status(200).json({ message: 'Module is delected'});
        } catch (error) {
            console.error('Error while deleting module:', error);
            res.status(error?.status || 500).json({ message: error?.message || 'Error while deleting product' });
        }
    }
}

export default ModuleController