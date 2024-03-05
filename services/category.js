import Category from "../models/category.js";

const CategoryService = {
    AddCategory: (details) => {
        return new Promise(async (resolve, reject) => {
            try {
                const category = await Category.create(details)
                resolve(category)
            } catch (err) {
                reject({
                    status: 500,
                    message: "Something Went Wrong"
                })
            }
        })
    },

    UpdateCategory: async (categoryid, newCategoryName) => {
        try {
            const updatedCategory = await Category.findOneAndUpdate(
                { categoryid },
                { $set: { categoryname: newCategoryName } },
                { new: true }
            );

            if (!updatedCategory) {
                throw { status: 404, message: 'Category not found.' };
            }
            return updatedCategory;
        } catch (error) {
            throw { status: 500, message: 'Error while updating category.' };
        }
    },

    DeleteCategory: async (categoryid) => {
        try {
            const deleteCategory = await Category.findOneAndDelete({ categoryid })

            if (!deleteCategory) {
                throw {
                    status: 404,
                    message: 'category not found.'
                };
            }
            return deleteCategory;
        } catch (error) {
            throw {
                status: 500,
                message: 'Error while deleting category.'
            };
        }
    }
}

export default CategoryService