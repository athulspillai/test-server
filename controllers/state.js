import StateService from "../services/state.js";

const StateController = {
    AddState: async (req, res) => {
        try {
            const response = await StateService.AddState(req?.body)
            console.log(response)
            res.status(201).json({ message: 'State is added Successfully' })
        } catch (error) {
            console.error('Error while State adding:', error?.message || error);
            res.status(error?.status || 500).json({ message: error?.message || error })
        }
    },

    UpdateState: async (req, res) => {
        try {
            const { stateid, newStateName } = req.body;
            const updatedState = await StateService.UpdateState(stateid, newStateName)
            res.status(200).json({ message: 'State is updated', state: updatedState });
        } catch (error) {
            console.error('Error while updating state:', error);
            res.status(error.status || 500).json({ message: error.message || 'Internal Server Error' });
        }
    },

    DeleteState: async (req, res) => {
        const { stateid } = req.body;
        try {
            await StateService.DeleteState(stateid)
            res.status(200).json({ message: 'State is deleted' })
        } catch (error) {
            console.error('Error while deleting state:', error);
            res.status(error?.status || 500).json({ message: error?.message || 'Error while deleting product' });
        }
    }
}

export default StateController