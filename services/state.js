import State from "../models/state.js";

const StateService = {
    AddState: (details) => {
        return new Promise(async (resolve, reject) => {
            try {
                const state = await State.create(details)
                resolve(state)
            } catch (err) {
                reject({
                    status: 500,
                    message: "Something Went Wrong"
                })
            }
        })
    },

    UpdateState: async (stateid, newStateName) => {
        try {
            const updatedState = await State.findOneAndUpdate(
                { stateid },
                { $set: { statename: newStateName } },
                { new: true }
            );

            if (!updatedState) {
                throw { status: 404, message: 'State not found.' };
            }
            return updatedState
        } catch (error) {
            throw { status: 500, message: 'Error while updating state.' };
        }
    },

    DeleteState: async (stateid) => {
        try {
            const deleteState = await State.findOneAndDelete({ stateid })

            if (!deleteState) {
                throw {
                    status: 404,
                    message: 'state not found'
                };
            }
            return deleteState
        } catch (error) {
            throw {
                status: 500,
                message: 'Error while deleting state.'
            };
        }
    }
}

export default StateService