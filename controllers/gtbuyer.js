import GtbuyerService from "../services/gtbuyer.js";

const GtbuyerController = {
    AddGtbuyer: async (req, res) => {
        try {
            const response = await GtbuyerService.AddGtbuyer(req?.body)
            console.log(response)
            res.status(201).json({ message: 'Gtbuyer is added Successfully' })
        } catch (error) {
            console.error('Error while gtbuyer form adding', error?.message || error);
            res.status(error?.status || 500).json({ message: error?.message || error })
        }
    },
}

export default GtbuyerController