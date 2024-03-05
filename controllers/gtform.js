import GtformService from "../services/gtform.js";

const GtformController = {
    AddGtform: async (req, res) => {
        try {
            const response = await GtformService.AddGtform(req?.body)
            console.log(response)
            res.status(201).json({ message: 'Gtform is added Successfully' })
        } catch (error) {
            console.error('Error while gtform form adding', error?.message || error);
            res.status(error?.status || 500).json({ message: error?.message || error })
        }
    }
}

export default GtformController