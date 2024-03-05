import TemplateService from "../services/template.js";

const TemplateController = {
    AddTemplate: async (req, res) => {
        try {
            const response = await TemplateService.AddTemplate(req?.body)
            console.log(response)
            res.status(201).json({ message: 'Template is added Successfully ' })
        } catch (error) {
            console.error('Error while template adding:', error?.message || error);
            res.status(error?.status || 500).json({ message: error?.message || error })
        }
    },

    UpdatedTemplate: async (req, res) => {
        try {
            const { templateid, newTemplateName } = req.body;
            const updatedTemplate = await TemplateService.UpdateTemplate(templateid, newTemplateName)
            res.status(200).json({ message: 'Template is updated', template: updatedTemplate });
        } catch (error) {
            console.error('Error while updating template:', error);
            res.status(error.status || 500).json({ message: error.message || 'Internal Server Error' });
        }
    },

    DeleteTemplate: async (req, res) => {
        const { templateid } = req.body;
        try {
            await TemplateService.DeleteTemplate(templateid);
            res.status(200).json({ message: 'Template is deleted' });
        } catch (error) {
            console.error('Error while deleting template:', error);
            res.status(error?.status || 500).json({ message: error?.message || 'Error while deleting product' });
        }
    },

    DeleteTemplateModule: async (req, res) => {
        const { moduleid } = req.body;
        try {
            await TemplateService.DeleteTemplateModule(moduleid)
            res.status(200).json({ message: 'Module is deleted' });
        } catch (error) {
            console.error('Error while deleting module:', error);
            res.status(error?.status || 500).json({ message: error?.message || 'Error while deleting product' });
        }
    },
  
      
}

export default TemplateController