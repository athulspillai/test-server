
import mongoose from "mongoose";

const templateSchema = new mongoose.Schema({
    templateid: {
        type: String,
        required: true,
    },
    templatename: {
        type: String,
        required: true,
    },
    modules: [{
        moduleid: {
            type: String,
            required: true,
        },
        modulename: {
            type: String,
            required: true
        },
        modulegroupname: {
            type: String,  
            required: true
        },
        templateview: {
            type: Boolean,
            default: false,
        },
        add: {
            type: Boolean,
            default: false,
        },
        edit: {
            type: Boolean,
            default: false,
        },
        delete: {
            type: Boolean,
            default: false,
        },
        view: {
            type: Boolean,
            default: false,
        },
    }],
});

const Template = mongoose.model('Template', templateSchema);

export default Template;