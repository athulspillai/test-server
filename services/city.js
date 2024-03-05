import City from "../models/city.js";

const CityService = {
    AddCity: (details) => {
        return new Promise(async (resolve, reject) => {
            try {
                const city = await City.create(details)
                resolve(city)
            } catch (err) {
                reject({
                    status: 500,
                    message: "Something Went Wrong"
                })
            }
        })
    },

    UpdateCity: async (cityid, newCityName) => {
        try {
            const updatedCity = await City.findOneAndUpdate(
                { cityid },
                { $set: { cityname: newCityName } },
                { new: true }
            );
            if (!updatedCity) {
                throw { status: 404, message: 'City not found.' };
            }
            return updatedCity
        } catch (error) {
            throw { status: 500, message: 'Error while updating city.' };
        }
    },

    DeleteCity: async (cityid) => {
        try {
            const deleteCity = await City.findOneAndDelete({ cityid })
            if (!deleteCity) {
                throw {
                    status: 404,
                    message: 'City not found'
                };
            }
            return deleteCity
        } catch (error) {
            throw {
                status: 500,
                message: 'Error while deleting city.'
            };
        }
    }
}

export default CityService