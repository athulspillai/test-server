import Subcategory from "../models/subcategory.js";

const SubcategoryService = {
    AddSubcategory: (details) => {
        return new Promise(async (resolve, reject) => {
            try {
                const subcategory = await Subcategory.create(details)
                resolve(subcategory)
            } catch (err) {
                reject({
                    status: 500,
                    message: "Something Went Wrong"
                })
            }
        })
    },

    UpdateSubcategory: async (subcategoryid, newSubcategoryName) => {
        try {
            const updatedSubcategory = await Subcategory.findOneAndUpdate(
                { subcategoryid },
                { $set: { subcategoryname: newSubcategoryName }},
                { new: true }
            );
            if (!updatedSubcategory) {
                throw { status: 404, message: 'Subcategory not found.' };
            }
            return updatedSubcategory;
        } catch (error) {
            throw { status: 500, message: 'Error while updating subcategory.' };
        }
    },

    DeleteSubcategory: async (subcategoryid) => {
        try{
            const deleteSubcategory = await Subcategory.findOneAndDelete({ subcategoryid })
            if (!deleteSubcategory) {
                throw {
                    status: 404,
                    message: 'Subcategory not found.'
                };
            }
            return deleteSubcategory;
        } catch (error) {
            throw {
                status: 500,
                message: 'Error while deleting subcategory.'
            };
        }
    }
}

export default SubcategoryService