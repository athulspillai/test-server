import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema({
    moduleid: {
        type: String,
        required: true,
    },
    modulegroupid: {
        type: String,
        required: true,
    },
    modulegroupname: {
        type: String,
        required: true,
    },
    modulename: {
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
})

const Module = mongoose.model('Module', moduleSchema)

export default Module