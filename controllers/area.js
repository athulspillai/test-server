import AreaService from "../services/area.js";

const Areacontroller = {
    AddArea: async (req, res) => {
        try {
            const response = await AreaService.AddArea(req?.body)
            console.log(response);
        } catch (error) {
            console.error('Error while city adding:', error?.message || error);
            res.status(error?.status || 500).json({ message: error?.message || error })
        }
    },

    UpdateArea: async (req,res) => {
        try {
            const { areaid, newAreaName} = req.body;
            const updatedArea = await AreaService.UpdateArea(areaid, newAreaName)
            res.status(200).json({ message: 'Area is updated', area: updatedArea})
        } catch (error) {
            console.error('Error while updating area', error);
            res.status(error.status || 500).json({ message: error.message || 'Internal Server Error' });
        }
    },

    DeleteArea: async (req,res) => {
        const { areaid } = req.body;
        try {
            await AreaService.DeleteArea(areaid);
            res.status(200).json({ message: 'Area is deleted'})
        } catch (error) {
            console.error('Error while deleting area:', error);
            res.status(error?.status || 500).json({ message: error?.message || 'Error while deleting product' });
        }
    }
}

export default Areacontroller