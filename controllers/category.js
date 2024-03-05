import CategoryService from "../services/category.js";

const CategoryController = {
    AddCategory: async (req, res) => {
        try {
            const response = await CategoryService.AddCategory(req?.body)
            console.log(response)
            res.status(201).json({ message: 'Category is added Successfully' })
        } catch (error) {
            console.error('Error while Category adding:', error?.message || error);
            res.status(error?.status || 500).json({ message: error?.message || error })
        }
    },

    UpdateCategory: async (req, res) => {
        try {
            const { categoryid, newCategoryName } = req.body;
            const updatedCategory = await CategoryService.UpdateCategory(categoryid, newCategoryName)
            res.status(200).json({ message: 'Category is updated', category: updatedCategory });
        } catch (error) {
            console.error('Error while updating category:', error);
            res.status(error.status || 500).json({ message: error.message || 'Internal Server Error' });
        }
    },

    DeleteCategory: async (req, res) => {
        const { categoryid } = req.body;
        try {
            await CategoryService.DeleteCategory(categoryid);
            res.status(200).json({ message: 'Category is deleted' });
        } catch (error) {
            console.error('Error while deleting category:', error);
            res.status(error?.status || 500).json({ message: error?.message || 'Error while deleting product' });
        }
    }
}

export default CategoryController