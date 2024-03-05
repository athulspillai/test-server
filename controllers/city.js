import CityService from "../services/city.js";

const Citycontroller = {
    AddCity: async (req,res) => {
        try {
            const response = await CityService.AddCity(req?.body)
            console.log(response);
        } catch (error) {
            console.error('Error while city adding:', error?.message || error);
            res.status(error?.status || 500).json({ message: error?.message || error })
        }
    },

    UpdateCity: async (req,res) => {
        try {
            const { cityid, newCityName} = req.body;
            const updatedCity = await CityService.UpdateCity(cityid, newCityName)
            res.status(200).json({ message: 'City is updated', city: updatedCity})
        } catch (error) {
            console.error('Error while updating city', error);
            res.status(error.status || 500).json({ message: error.message || 'Internal Server Error' });
        }
    },

    DeleteCity: async (req,res) => {
        const { cityid } = req.body;
        try {
            await CityService.DeleteCity(cityid);
            res.status(200).json({ message: 'City is deleted'})
        } catch (error) {
            console.error('Error while deleting city:', error);
            res.status(error?.status || 500).json({ message: error?.message || 'Error while deleting product' });
        }
    }
}

export default Citycontroller