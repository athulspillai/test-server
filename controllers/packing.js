import PackingService from "../services/packing.js";

const PackingContoller = {
    AddPacking: async (req, res) => {
        try {
            const response = await PackingService.AddPacking(req?.body)
            console.log(response)
            res.status(201).json({ message: 'Packing is added Successfully' })
        } catch (error) {
            console.error('Error while packing adding:', error?.message || error);
            res.status(error?.status || 500).json({ message: error?.message || error })
        }
    },

    UpdatePacking: async (req, res) => {
        try {
            const { packingid, newPackingName } = req.body;
            const updatedPacking = await PackingService.UpdatePacking(packingid, newPackingName)
            res.status(200).json({ message: 'Packing is updated', packing: updatedPacking });
        } catch (error) {
            console.error('Error while updating packing', error);
            res.status(error.status || 500).json({ message: error.message || 'Internal Server Error' });
        }
    },

    DeletePacking: async (req, res) => {
        const { packingid } = req.body;
        try {
            await PackingService.DeletePacking(packingid);
            res.status(200).json({ message: 'Packing is deleted' });
        } catch (error) {
            console.error('Error while deleting packing:', error);
            res.status(error?.status || 500).json({ message: error?.message || 'Error while deleting product' });
        }
    }

}

export default PackingContoller