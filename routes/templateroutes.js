import express from 'express';
import Template from '../models/template.js';
import TemplateController from '../controllers/template.js';
import Module from '../models/module.js'

const router = express.Router();

router.post('/add-template', TemplateController.AddTemplate);
router.post('/delete-template', TemplateController.DeleteTemplate)
router.post('/update-template', TemplateController.UpdatedTemplate)
router.post('/delete-templatemodule', TemplateController.DeleteTemplateModule)

router.put('/update-template/:id', async (req, res) => {
    const templateId = req.params.id;
    try {
        const updatedTemplate = await Template.findByIdAndUpdate(
            templateId,
            { $set: req.body }, // Use $set to update only the specified fields
            { new: true }
        );

        if (!updatedTemplate) {
            return res.status(404).json({ message: 'Template not found' });
        }

        res.status(200).json(updatedTemplate); // Return the updated template
    } catch (error) {
        console.error('Error updating template:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/templates/:templateName', async (req, res) => {
    const templateName = req.params.templateName;
    try {
        const template = await Template.findOne({ templatename: templateName });

        if (!template) {
            return res.status(404).json({ message: 'Template not found' });
        }

        res.status(200).json(template);
    } catch (error) {
        console.error('Error fetching template details by name:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.put('/update-template-modules/:templateId', async (req, res) => {
    const { templateId } = req.params;
    const { modules } = req.body;

    try {
        const updatedTemplate = await Template.findOneAndUpdate(
            { templateid: templateId },
            { $set: { modules: modules } },
            { new: true }
        );

        if (!updatedTemplate) {
            return res.status(404).json({ error: 'Template not found' });
        }

        res.json(updatedTemplate);
    } catch (error) {
        console.error('Error updating template modules:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get('/templates', async (req, res) => {
    try {
        const templates = await Template.find();
        res.status(200).json(templates);
    } catch (error) {
        res.status(500).json({ message: 'Error while fetching template details.' });
    }
});



export default router;

