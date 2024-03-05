import Module from "../models/module.js";

const ModuleService = {
    AddModule: (details) => {
        return new Promise(async (resolve, reject) => {
            try {
                const module = await Module.create(details)
                resolve(module)
            } catch (err) {
                reject({
                    status: 500,
                    message: "Something Went Wrong"
                })
            }
        })
    },

    UpdateModule: async (moduleid, newModuleName) => {
        try {
            const updatedModule = await Module.findOneAndUpdate(
                { moduleid },
                { $set: { modulename: newModuleName } },
                { new: true }
            );

            return updatedModule;
        } catch (error) {
            throw { status: 500, message: 'Error while updating module.' };
        }
    },

    DeleteModule: async (moduleid) => {
        try {
            const deleteModule = await Module.findOneAndDelete({ moduleid })

            if (!deleteModule) {
                throw {
                    status: 404,
                    message: 'Module not found.'
                };
            }

            return deleteModule;
        } catch (error) {
            throw {
                status: 500,
                message: 'Error while deleting module.'
            };
        }
    }
}

export default ModuleService