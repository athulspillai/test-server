import Packing from "../models/packing.js";

const PackingService = {
    AddPacking: (details) => {
        return new Promise(async (resolve, reject) => {
            try {
                const packing = await Packing.create(details)
                resolve(packing)
            } catch (err) {
                reject({
                    status: 500,
                    message: "Something Went Wrong"
                })
            }
        })
    },

    UpdatePacking: async (packingid, newPackingName) => {
        try {
            const updatedPacking = await Packing.findOneAndUpdate(
                { packingid },
                { $set: { packingname: newPackingName } },
                { new: true }
            );

            if (!updatedPacking) {
                throw { status: 404, message: 'Packing not found.' };
            }
            return updatedPacking;
        } catch (error) {
            throw { status: 500, message: 'Error while updating packing.' };
        }
    },

    DeletePacking: async (packingid) => {
        try {
            const deletePacking = await Packing.findOneAndDelete({ packingid })

            if (!deletePacking) {
                throw {
                    status: 404,
                    message: 'category not found.'
                };
            }
            return deletePacking;
        } catch (error) {
            throw {
                status: 500,
                message: 'Error while deleting category.'
            };
        }
    }

}

export default PackingService