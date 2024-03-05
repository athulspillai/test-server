import Area from "../models/area.js";

const AreaService = {
    AddArea: (details) => {
        return new Promise(async (resolve, reject) => {
            try {
                const area = await Area.create(details)
                resolve(area)
            } catch (err) {
                reject({
                    status: 500,
                    message: "Something Went Wrong"
                })
            }
        })
    },

    UpdateArea: async (areaid, newAreaName) => {
        try {
            const updatedArea = await Area.findOneAndUpdate(
                { areaid },
                { $set: { areaname: newAreaName } },
                { new: true }
            );
            if (!updatedArea) {
                throw { status: 404, message: 'Area not found.' }
            }
            return updatedArea;
        } catch (error) {
            throw { status: 500, message: 'Error while updating area.' };
        }
    },

    DeleteArea: async (areaid) => {
        try {
            const deleteArea = await Area.findOneAndDelete({ areaid })
            if (!deleteArea) {
                throw {
                    status: 404,
                    message: 'Area not found'
                };
            }
            return deleteArea
        } catch (error) {
            throw {
                status: 500,
                message: 'Error while deleting area.'
            };
        }
    }
}

export default AreaService