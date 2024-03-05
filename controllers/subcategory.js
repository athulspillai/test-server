import SubcategoryService from "../services/subcategory.js";

const SubcategoryController = {
    AddSubcategory: async (req, res) => {
        try {
            const response = await SubcategoryService.AddSubcategory(req?.body)
            console.log(response);
        } catch (error) {
            console.error('Error while subcategory adding:', error?.message || error);
            res.status(error?.status || 500).json({ message: error?.message || error })
        }
    },

    UpdateSubcategory: async (req, res) => {
        try {
            const { subcategoryid, newSubcategoryName } = req.body;
            const updatedSubcategory = await SubcategoryService.UpdateSubcategory(subcategoryid, newSubcategoryName)
            res.status(200).json({ message: 'Subcategory is updated', subcategory: updatedSubcategory });
        } catch (error) {
            console.error('Error while updating subactegory', error);
            res.status(error.status || 500).json({ message: error.message || 'Internal Server Error' });
        }
    },

    DeleteSubcategory: async (req, res) => {
        const { subcategoryid } = req.body;
        try {
            await SubcategoryService.DeleteSubcategory(subcategoryid);
            res.status(200).json({ message: 'Subcategory is deleted' });
        } catch (error) {
            console.error('Error while deleting subcategory:', error);
            res.status(error?.status || 500).json({ message: error?.message || 'Error while deleting product' });
        }
    }
}

export default SubcategoryController