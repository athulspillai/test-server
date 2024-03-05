import Template from "../models/template.js";
import User from "../models/user.js";

const TemplateService = {
    AddTemplate: (details) => {
        return new Promise(async (resolve, reject) => {
            try {
                const template = await Template.create(details)
                resolve(template)
            } catch (err) {
                reject({
                    status: 500,
                    message: "Something Went Wrong"
                })
            }
        })
    },

    UpdateTemplate: async (templateid, newTemplateName) => {
        try {
            const updatedTemplate = await Template.findOneAndUpdate(
                { templateid },
                { $set: { templatename: newTemplateName } },
                { new: true }
            );

            if (!updatedTemplate) {
                throw { status: 404, message: 'Template not found.' };
            }

            // Update the User model
            await User.updateMany({ 'template.templateid': templateid }, {
                $set: { 'template.templatename': newTemplateName }
            });

            return updatedTemplate;
        } catch (error) {
            throw { status: 500, message: 'Error while updating template.' };
        }
    },

    DeleteTemplate: async (templateid) => {
        try {
            const deleteTemplate = await Template.findOneAndDelete({ templateid });

            if (!deleteTemplate) {
                throw {
                    status: 404,
                    message: 'Template not found.'
                };
            }

            // Remove the template reference from user documents
            await User.updateMany({ 'template.templateid': templateid }, {
                $unset: { 'template': 1 }
            });

            return deleteTemplate;
        } catch (error) {
            throw {
                status: 500,
                message: 'Error while deleting template.'
            };
        }
    },

    DeleteTemplateModule: async (moduleid) => {
        try {
            // Remove the module from the corresponding template in the template model
            const updatedTemplate = await Template.updateOne(
                { 'modules.moduleid': moduleid },
                { $pull: { modules: { moduleid } } }
            );

            if (updatedTemplate.nModified === 0) {
                throw {
                    status: 404,
                    message: 'Module not found in any template.'
                };
            }

            return { updatedTemplate };
        } catch (error) {
            throw {
                status: error.status || 500,
                message: error.message || 'Error while deleting module.'
            };
        }
    }

   
      

}

export default TemplateService